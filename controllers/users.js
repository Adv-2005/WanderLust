const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user"); // Adjust the path if needed


module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.createUser = async(req,res)=>{
    try{
let {email , username, password} = req.body
    let newUser =  new User({email,username})
    const registeredUser = await User.register(newUser , password)
    console.log(registeredUser)
    req.login(registeredUser, (err)=>{
        if(err){
            req.flash("error", "Login failed, please try again!")
            return next(err)
        }
        req.flash("success" , "Welcome to Wanderlust!")
    res.redirect("/listings")
    })
    
    }
    catch(error){
        req.flash("error", error.message)
        res.redirect("/signup")
    }
    
}

module.exports.renderLogin =  (req,res)=>{
    res.render("users/login.ejs")
}


module.exports.loginUser = async(req,res)=>{
    req.flash("success", `Welcome back, ${req.user.username}!`);
    res.redirect(res.locals.redirectURL || "/listings");
    
}

module.exports.logoutUser = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success", "You are successfully logged out!")
        res.redirect("/listings")
    })
}