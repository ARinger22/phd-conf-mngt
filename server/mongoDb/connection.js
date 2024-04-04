const mongoose = require('mongoose');

// credentials import
require('dotenv').config();
const DB = process.env.MONGODB_CONNECTION_KEY

mongoose.connect(DB).then( () => {
    console.log("Connection Success..");

    // const AppData = require('../model/applicationData');
    
    // // insert a new field in the database of all the documents
    // AppData.updateMany({}, { $set: { isarchived: false } })
    // .then((result) => {
    //     console.log("Updated..");
    // }).catch((err) => {
    //     console.log("Error..", err);
    // });

}).catch((err) => {
    console.log("Connection Failed..", err);
});
