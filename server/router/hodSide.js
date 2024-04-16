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

const searchDriveFolder = require('../driveUploadFunctions/searchFolder');
const uploadImageDrive = require('../driveUploadFunctions/uploadImage');
const createPublicUrl = require('../driveUploadFunctions/createPublicUrl');
const AppDataSett = require('../model/applicationSettlement');

router.post('/viewHodApplications', async (req, res) => {

    const bearerHeader = await req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(422).json({ error: "No Header" });
    }
    var bearerToken = bearerHeader.split(" ")[1];

    // console.log( "Token: " + bearerToken);

    if (!bearerToken) {
        return res.status(422).json({ error: "No Token" });
    }

    // // verfiy the token
    try {
        var decode = jwt.verify(bearerToken, process.env.JWT_SECRET)

        // //setting email and role from decode
        // const facultyEmail = decode.email;
        console.log("decode: " + decode.name)
        const hodDepartment = decode.department;
        console.log("HOD Department: " + hodDepartment)

        const appData = await AppDataSett.find().sort({ "updatedAt": -1 });
        var data1 = new Array();
        const user = await User.find();
        for (let i = 0; i < user.length; i++) {
            if (hodDepartment === user[i].department ) {
                const appData = await AppDataSett.find({ email: user[i].email });
                appData.forEach(element => {
                    data1.push(element);
                });
            }
        }
        const data2 = [];
        for (let i = 0; i < appData.length; i++) {
            const facultyAppDataSett = await AppData.find({ _id: data1[i].parentId }).sort({ "updatedAt": -1 });
            data2.push(...facultyAppDataSett);
        }
        const data3 = {data : data2, data2 : data1};
        return res.status(200).json(data3);
        return res.status(200).json({ data: data1 });
    } catch (error) {
        console.log(error);
        return res.status(422).json({ error: error });
    }
})

router.post('/hodApproveOrDisapprove', async (req, res) => {
    var { id, status, image} = req.body;

    try {

        const bearerHeader = await req.headers["authorization"];

        if (!bearerHeader) {
            return res.status(422).json({ error: "No Header" });
        }
        var bearerToken = bearerHeader.split(" ")[1];

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

        if (appData && appData.status === "1"){
            const applicationFolderName = appData.conferenceStarts + "-" + appData.conferenceEnds + "__" + appData.nameOfConference;
            const applicationFolderId = await searchDriveFolder(applicationFolderName);
            const hodSignId = await uploadImageDrive(image, applicationFolderId, userEmail, "hodSign.jpg");
    
            if (hodSignId === null) {
                console.log("Error");
                return res.status(422).json("Error Occurred..");
            }
    
            const hodSignLink = await createPublicUrl(hodSignId);
            console.log(hodSignLink);
            await AppData.findByIdAndUpdate(id, {
                lastModified: userEmail,
                hodSignLink: hodSignLink,
                status: status,
                hodSignTimestamp: new Date().toLocaleString(),
            });
            return res.status(200).json("Updated..");
        }
        else if(appDataSett.status === "1"){
            const applicationFolderName = appDataSett.travels[0].deptdate + "-" + appDataSett.travels[0].depttime + "__" + appDataSett.travels[0].arrivaldate + "-" + appDataSett.travels[0].arrivaltime;
            const applicationFolderId = await searchDriveFolder(applicationFolderName);
            const hodSignId = await uploadImageDrive(image, applicationFolderId, userEmail, "hodSign.jpg");
            if (hodSignId === null) {
                return res.status(422).json("Error Occurred..");
            }
            
            const hodSignLink = await createPublicUrl(hodSignId);
            console.log(hodSignLink);
            await AppDataSett.findByIdAndUpdate(id, {
                lastModified: userEmail,
                hodSignLink: hodSignLink,
                status: status,
                hodSignTimestamp: new Date().toLocaleString(),
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