const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

// connection established
require('../mongoDb/connection');


// requiring user Schema                
const User = require('../model/userSchema');
const AppData = require('../model/applicationData');

// credentials import
require('dotenv').config();


router.post('/deanApproveOrDisapprove', async (req, res) => {
    // const {id, status, remarks} = req.body;
    console.log("here")
    const { id, status } = req.body;

    // Debug Purpose
    // console.log(id); console.log(status);
    // console.log(grantEligibility); console.log(researchRemarks);
    try {

        const bearerHeader = await req.headers["authorization"];

        if (!bearerHeader) {
            return res.status(422).json({ error: "No Header" });
        }
        var bearerToken = bearerHeader.split(" ")[1];

        // console.log( "Student Side Token: " + bearerToken);

        if (!bearerToken) {
            return res.status(422).json({ error: "No Token" });
        }

        // verfiy the token
        var decode = jwt.verify(bearerToken, process.env.JWT_SECRET)

        //setting email from decode
        const userEmail = decode.email;

        const appData = await AppData.findById(id);
        if (appData.status !== "4")
            return res.status(422).json("Can't Approve Or Disapprove..");

        // console.log(appData);
        // console.log(userEmail);

        await AppData.findByIdAndUpdate(id, {
            lastModified: userEmail,
            status: status,
        });
        return res.status(200).json("Updated..");
    } catch (error) {
        console.log(error);
        return res.status(422).json({ error: error });
    }
})

module.exports = router;