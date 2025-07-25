const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing = require("../models/listing.js")
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js")    
const listingController = require("../controllers/listing.js")



router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,validateListing,wrapAsync(listingController.createListing))


//new route
router.get("/new",isLoggedIn, listingController.renderNewForm)

router.route("/:id")
.get(wrapAsync(listingController.showPage))
.put(isLoggedIn,isOwner,validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing))


router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))


module.exports = router