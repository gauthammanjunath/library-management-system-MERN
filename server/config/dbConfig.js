const mongoose =require("mongoose");
mongoose.set('strictQuery',false)
mongoose.connect(process.env.mongo_local)

const connection = mongoose.connection;
connection.on('connected',()=> {
    console.log("Mongo DB COnnection Successfull");
})
connection.on('error',()=> {
    console.log("Mongo DB COnnection Failed");
})
module.exports = connection;
