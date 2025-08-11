const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: mapToken });
// const mbxClient = require('@mapbox/mapbox-sdk');

module.exports.searchListings = async (req, res) => {
    const { q } = req.query;

    // Redirect if search query is empty
    if (!q) {
        return res.redirect("/listings");
    }

    // Create a case-insensitive regular expression
    const searchRegex = new RegExp(q, 'i');

    const listings = await Listing.find({
        $or: [
            { title: { $regex: searchRegex } },
            { location: { $regex: searchRegex } },
            { country: { $regex: searchRegex } }
        ]
    });

    if (listings.length === 0) {
        req.flash("error", "No listings found for your search. Try another destination!");
        return res.redirect("/listings");
    }

    // Pass a variable to the template to indicate this is a search result page
    res.render("listings/index.ejs", { listings, isSearch: true, searchQuery: q });
};






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

// In controllers/listing.js
module.exports.createListing = async (req, res, next) => {
    const response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    // Check if geocoding was successful
    if (!response || !response.body || !response.body.features || response.body.features.length === 0) {
        req.flash("error", "Invalid location. Please try again.");
        return res.redirect("/listings/new");
    }

    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    newlisting.geometry = response.body.features[0].geometry;
    
    await newlisting.save();

    req.flash("success", "New listing added!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req,res)=>{
    const {id}= req.params;
    const selectedListing = await Listing.findById(id);
      if (!selectedListing) {
        req.flash("error" , "Listing does not exist!")
        return res.redirect("/listings")
    }
    res.render("listings/edit.ejs", {selectedListing})
}

// In controllers/listing.js
module.exports.updateListing = async(req,res)=>{
    const {id}= req.params;

    // First, find the listing to update
    let listing = await Listing.findById(id);

    // Update text fields from the form
    listing.set(req.body.listing);

    // If a new location is provided, update the geometry
    if (req.body.listing.location !== listing.location) {
        const response = await geocodingClient.forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        }).send();
        
        if (response && response.body && response.body.features && response.body.features.length > 0) {
            listing.geometry = response.body.features[0].geometry;
        } else {
             req.flash("error", "Location not found, please try a different one.");
             return res.redirect(`/listings/${id}/edit`);
        }
    }
    
    // If a new file is uploaded, update the image
    if(typeof req.file !== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
    }

    // Save all changes
    await listing.save();

    req.flash("success" , "Listing updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
}
