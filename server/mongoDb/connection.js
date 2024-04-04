const mongoose = require('mongoose');

// credentials import
require('dotenv').config();
const DB = process.env.MONGODB_CONNECTION_KEY

mongoose.connect(DB).then( () => {
    console.log("Connection Success..");

    // const AppDataSett = require('../model/applicationSettlement');
    
    // // insert a new field in the database of all the documents
    // AppDataSett.updateMany({}, { $set: { isarchived: false } })
    // .then((result) => {
    //     console.log("Updated..");
    // }).catch((err) => {
    //     console.log("Error..", err);
    // });

}).catch((err) => {
    console.log("Connection Failed..", err);
});
