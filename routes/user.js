const express = require("express")
const router = express.Router()
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync")
const passport = require("passport")
const {saveRedirectURL} = require("../middleware.js")
const userController = require("../controllers/users.js")

router.route("/signup")
.get( userController.renderSignup) 
.post( wrapAsync(userController.createUser))

router.route("/login")
.get( userController.renderLogin)
.post(saveRedirectURL, passport.authenticate("local", {failureRedirect: "/login", failureFlash:true}), wrapAsync(userController.loginUser))

router.get("/logout", userController.logoutUser)

module.exports = router