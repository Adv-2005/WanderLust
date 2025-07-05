const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
    filename: String,
    url:{
        type:String,
        default:"https://images.unsplash.com/photo-1745990652119-f13cced69b7c?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) =>
        v=== ""? "https://images.unsplash.com/photo-1745990652119-f13cced69b7c?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        :v
    } 
    },
    price:Number,
    country:String,
    location:String,
    reviews: [
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ] 
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing