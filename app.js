if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}


const express = require ("express");
const app = express();
const mongoose=require("mongoose")
// const mongo_url="mongodb+srv://adivarshney:Jarvis%402010@cluster0.02cgib5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const ExpressError = require("./utils/ExpressError.js")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const session = require("express-session")
const MongoStore = require('connect-mongo');
const flash = require("connect-flash")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")


const dbURL = process.env.ATLASDB_URL



const listingsRouter = require("./routes/listing.js")
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")
const passport = require("passport");
console.log("🔍 dbURL:", dbURL);

main().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(dbURL)
}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "/public")))

const store = MongoStore.create(
    {
        mongoUrl: dbURL,
        crypto:{
            secret: process.env.SECRET,
        },
        touchAfter:24*3600
    }
)

store.on("error" , ()=>{
    console.log("Error in Mongo Store Session", err)
})

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave:false,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true
    }

}


app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user
    next()
})

app.use("/listings", listingsRouter)
app.use("/listings/:id/reviews", reviewsRouter)
app.use("/", userRouter)


app.get("/", (req, res) => {
    res.redirect("/listings");
  });

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

