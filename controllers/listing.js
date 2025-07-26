const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
    const listings = await Listing.find({}).populate("owner");
    res.render("listings/index.ejs", { listings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}


module.exports.showPage = async (req, res, next) => {
    const { id } = req.params;

 

    const listing = await Listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");

    if (!listing) {
        req.flash("error" , "Listing does not exist!")
       return res.redirect("/listings")
    }

    res.render("listings/show.ejs", { listing });
}

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    if (!newlisting.image.url) {
        newlisting.image.url = "https://images.unsplash.com/photo-1745990652119-f13cced69b7c?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    await newlisting.save();
    req.flash("success", "New listing added!");
    res.redirect("/listings");
}

module.exports.renderEditForm = async(req,res)=>{
    const {id}= req.params;
    const selectedListing = await Listing.findById(id);
      if (!selectedListing) {
        req.flash("error" , "Listing does not exist!")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs", {selectedListing})
}

module.exports.updateListing = async(req,res)=>{
    const {id}= req.params;
   await Listing.findByIdAndUpdate(id, { ...req.body.listing})
   req.flash("success" , "Listing edited!")
   res.redirect(`/listings/${id}`)
}

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}