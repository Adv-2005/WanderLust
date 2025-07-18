const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const {listingSchema} = require("../schema.js")
const Listing = require("../models/listing.js")
const {isLoggedIn} = require("../middleware.js")    

const validateListing = (req,res,next)=>{
let {error} = listingSchema.validate(req.body)

   if(error){
    let errMsg = error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400, errMsg)
   }
   else{
    next()
   }
}




//index route
router.get("/",wrapAsync(async (req,res)=>{
   const allListings = await Listing.find({})
   res.render("listings/index.ejs", {allListings})
}))

//new route
router.get("/new",isLoggedIn, (req,res)=>{
    res.render("listings/new.ejs")
})

//show route


router.get("/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;

 

    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
        req.flash("error" , "Listing does not exist!")
       return res.redirect("/listings")
    }

    res.render("listings/show.ejs", { listing });
}));


//create route

router.post("/",validateListing,isLoggedIn,wrapAsync(async(req,res,next)=>{
   
         const newlisting = new Listing(req.body.listing);
     await newlisting.save() 
     req.flash("success" , "new listing added!")
     res.redirect("/listings")
}))

//edit route

router.get("/:id/edit",isLoggedIn, wrapAsync(async(req,res)=>{
    const {id}= req.params;
    const selectedListing = await Listing.findById(id);
      if (!selectedListing) {
        req.flash("error" , "Listing does not exist!")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs", {selectedListing})
}))

//update route

router.put("/:id",validateListing,isLoggedIn, wrapAsync(async(req,res)=>{
    const {id}= req.params;
   await Listing.findByIdAndUpdate(id, { ...req.body.listing})
   req.flash("success" , "Listing edited!")
   res.redirect(`/listings/${id}`)
}))


//delete route
router.delete("/:id",isLoggedIn, wrapAsync(async(req,res)=>{
    const {id}= req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    req.flash("success" , "listing deleted!")
    res.redirect("/listings")
}))


module.exports = router