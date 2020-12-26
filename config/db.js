const mangoose =require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDb = async () => {
    try {
        await mangoose.connect(db , {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
        });
        console.log("mongo db connected")
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDb;
