const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

// connection established
require('../mongoDb/connection');


// requiring user Schema                
const User = require('../model/userSchema');
const AppData = require('../model/applicationData');
const AppDataSett = require('../model/applicationSettlement');

// credentials import
require('dotenv').config();

const searchDriveFolder = require('../driveUploadFunctions/searchFolder');
const uploadImageDrive = require('../driveUploadFunctions/uploadImage');
const createPublicUrl = require('../driveUploadFunctions/createPublicUrl');

router.post('/deanApproveOrDisapprove', async (req, res) => {
    var { id, status, image, approve_date, approve_time} = req.body;

    try {

        const bearerHeader = await req.headers["authorization"];

        if (!bearerHeader) {
            return res.status(422).json({ error: "No Header" });
        }
        var bearerToken = bearerHeader.split(" ")[1];

        // console.log( "Student Side Token: " + bearerToken);
        if (!bearerToken) {
            console.log("No Token");
            return res.status(422).json({ error: "No Token" });
        }

        // verfiy the token
        var decode = jwt.verify(bearerToken, process.env.JWT_SECRET)
        //setting email from decode
        const userEmail = decode.email;

        const appData = await AppData.findById(id);
        const appDataSett = await AppDataSett.findById(id);

        if (appData && appData.status === "4"){
            const applicationFolderName = appData.conferenceStarts + "-" + appData.conferenceEnds + "__" + appData.nameOfConference;
            const applicationFolderId = await searchDriveFolder(applicationFolderName);
            const deanSignId = await uploadImageDrive(image, applicationFolderId, userEmail, "deanSign.jpg");

            if (deanSignId === null) {
                return res.status(422).json("Error Occurred..");
            }

            const deanSignLink = await createPublicUrl(deanSignId);
            console.log(deanSignLink);
            await AppData.findByIdAndUpdate(id, {
                lastModified: userEmail,
                deanSignLink: deanSignLink,
                status: status,
                dean_approve_date: approve_date,
                dean_approve_time : approve_time,
            });

            return res.status(200).json("Updated..");
        }
        else if(appDataSett.status === "4"){
            const applicationFolderName = appDataSett.travels[0].deptdate + "-" + appDataSett.travels[0].depttime + "__" + appDataSett.travels[0].arrivaldate + "-" + appDataSett.travels[0].arrivaltime;
            const applicationFolderId = await searchDriveFolder(applicationFolderName);
            const deanSignId = await uploadImageDrive(image, applicationFolderId, userEmail, "deanSign.jpg");
            if (deanSignId === null) {
                return res.status(422).json("Error Occurred..");
            }
            
            const deanSignLink = await createPublicUrl(deanSignId);
            console.log(deanSignLink);
            await AppDataSett.findByIdAndUpdate(id, {
                lastModified: userEmail,
                deanSignLink: deanSignLink,
                status: status,
                dean_approve_date: approve_date,
                dean_approve_time : approve_time,
            });
            
            return res.status(200).json("Updated..");
        }
        else return res.status(422).json("Can't Approve Or Disapprove..");
    } catch (error) {
        console.log(error);
        return res.status(422).json({ error: error });
    }
})

module.exports = router;