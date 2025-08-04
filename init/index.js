const mongoose= require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
require("dotenv").config();
console.log("Mapbox token is:", process.env.MAP_TOKEN);
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAP_TOKEN });



const mongo_url=process.env.ATLASDB_URL

main().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect(mongo_url)
}

const initDB = async () => {
  await Listing.deleteMany({});

  const listingsWithGeo = await Promise.all(initData.data.map(async (obj) => {
    const geoRes = await geocodingClient.forwardGeocode({
      query: obj.location,
      limit: 1
    }).send();

    const coordinates = geoRes.body.features[0]?.geometry?.coordinates || [0, 0];

    return {
      ...obj,
      geometry: {
        type: "Point",
        coordinates
      },
      owner: '6879d6f5b091e46b30efbe41'
    };
  }));

  await Listing.insertMany(listingsWithGeo);
  console.log("Data was initialized with geometry!");
};
initDB()




