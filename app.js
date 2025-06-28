const express = require ("express");
const app = express();
const mongoose=require("mongoose")
const mongo_url="mongodb://127.0.0.1:27017/test"
const Listing = require("./models/listing.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const Review = require("./models/review.js")

const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema} = require("./schema.js")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "/public")))
main().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(mongo_url)
}

app.get("/", (req,res)=>{
    res.send("working root")
})

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
app.get("/listings",wrapAsync(async (req,res)=>{
   const allListings = await Listing.find({})
   res.render("listings/index.ejs", {allListings})
}))

//new route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs")
})

//show route


app.get("/listings/:id", wrapAsync(async (req, res, next) => {
    const { id } = req.params;

 

    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
        return next(new ExpressError(404, "Listing Not Found"));
    }

    res.render("listings/show.ejs", { listing });
}));


//create route

app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
   
         const newlisting = new Listing(req.body.listing);
     await newlisting.save() 
     res.redirect("/listings")
}))

//edit route

app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
    const {id}= req.params;
    const selectedListing = await Listing.findById(id);
    res.render("listings/edit.ejs", {selectedListing})
}))

//update route

app.put("/listings/:id",validateListing, wrapAsync(async(req,res)=>{
    const {id}= req.params;
   await Listing.findByIdAndUpdate(id, { ...req.body.listing})
   res.redirect(`/listings/${id}`)
}))


//delete route
app.delete("/listings/:id", wrapAsync(async(req,res)=>{
    const {id}= req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing)
    res.redirect("/listings")
}))


//Reviews
//Post Route
app.post("/listings/:id/reviews", wrapAsync(async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        const newReview = new Review(req.body.review); // ✅ define first
        await newReview.save();

        listing.reviews.push(newReview._id); // ✅ use after definition
        await listing.save();

        console.log("Review saved and added to listing");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        console.error("Error saving review:", err);
        res.status(500).send("Error saving review");
    }
}));







app.use((req, res, next) => {
    next(new ExpressError(404, "Page not Found"))
})

app.use((err,req,res,next)=>{
    const {statusCode = 500, message= "Something went Wrong"} = err
    res.status(statusCode).render("error.ejs", {message})
    // res.status(statusCode).send(message) 
})

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080")
})

