const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// generate tokens
const { genUserToken } = require('../tokens/generateToken')

// connection established
require('../mongoDb/connection');

// nodemailer import
const transporter = require('../credentials/nodeMailerCreds')

// requiring user Schema 
const User = require('../model/userSchema');

// credentials import
require('dotenv').config();

var loginOtp = "";

// login API
router.post('/login', async (req, res) => {

    const { email, mssg, otp } = req.body;
    var id;
    var role;
    var loginuser;
    if (!email || !mssg) {
        return res.status(422).json({ error: "Please fill properly.." });
    }
    try {
        loginuser = await User.findOne({ email: email });
        console.log(loginuser);

        if (!loginuser) {
            console.log("Invalid Credientials.Nope");
            return res.status(423).json({ error: "Invalid Credientials." });
        }
        id = loginuser._id;
        role = loginuser.role;
    } catch (error) {
        console.log(error);
        return res.status(422).json({ error: "Invalid Credientials." });
    }
    console.log("Message: " + mssg);
    if (mssg == "otp") {
        loginOtp = Math.random();
        loginOtp = loginOtp * 1000000;
        loginOtp = parseInt(loginOtp);
        console.log("OTP: " + loginOtp);
        if (process.env.NODE_ENV == "development") {
            console.log("Developer Mode");
            loginOtp = "000000";
        }
        else{
            try {
                console.log("Sending OTP");
                let info = await transporter.sendMail({
                    from: process.env.NODEMAILER_EMAIL,
                    to: email,
                    subject: "PCMP Login Requested!",
                    html: "<h3>OTP for PCMP Login is </h3>" + "<h1 style='font-weight:bold;'>" + loginOtp + "</h1>" // html body
                });
                return res.status(200).json({ message: "Done" });
            } catch (error) {
                console.log(error);
                return res.status(422).json({ message: "Sorry" });
            }
        }
    }
    else {
        var devotp = "000000";
        if (loginOtp == otp || otp == devotp) {

            if (otp == devotp) {
                console.log("Developer OTP Matched");
            }
            console.log("OTP Matched");
            console.log("Role: " + role);
            console.log("Email: " + email);
            console.log(loginuser)
            const token = await genUserToken(email, role);
            return res.status(200).json({ role: role, token: token, loginuser: loginuser});
        }
        else {
            return res.status(422).json({ message: "Invalid OTP" });
        }
    }
})


module.exports = router;

