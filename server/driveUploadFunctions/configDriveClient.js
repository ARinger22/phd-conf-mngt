// importing google for using google apis
const { google } = require('googleapis');

// requiring express for using it
const express = require("express");

const token = require('fs').readFileSync('./token.json');
const credentials = require('fs').readFileSync('./credentials.json');
const tokenJson = JSON.parse(token);
const credentialsJson = JSON.parse(credentials);

require('dotenv').config();


const clientId = tokenJson.client_id;
const clientSecret = tokenJson.client_secret;
const refreshToken = tokenJson.refresh_token;
// console.log(credentialsJson.web.redirect_uris[0]);
const redirectUrl = credentialsJson.web.redirect_uris[0];
// const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
// const redirectUrl = process.env.GOOGLE_DRIVE_CLIENT_REDIRECT_URL;
// const refreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;




const createDriveClient = () => {
    const client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

    client.setCredentials({ refresh_token: refreshToken });

    return google.drive({
        version: 'v3',
        auth: client,
    });
}

module.exports = createDriveClient;


// const express = require('express');
// const multer = require('multer');
// const { google } = require('googleapis');
// const app = express();
// const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files
// const router = express.Router();


// // Load environment variables from .env file
// // dotenv.config();
// require('dotenv').config();


// // Configuration

// // const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
// // const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
// // const redirectUrl = process.env.GOOGLE_DRIVE_CLIENT_REDIRECT_URL;
// const clientId = process.env.GOOGLE_DRIVE_CLIENT_ID;
// const clientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
// const redirectUri = process.env.GOOGLE_DRIVE_CLIENT_REDIRECT_URL;
// const scopes = ['https://www.googleapis.com/auth/drive'];

// // Create an OAuth2 client
// const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

// // Generate the authentication URL
// const authUrl = oAuth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: 'offline',
//   /** Pass in the scopes array defined above.
//   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//   scope: scopes,
//   // Enable incremental authorization. Recommended as a best practice.
//   include_granted_scopes: true
// });

// // Get the authentication URL
// router.get('/auth/google', (req, res) => {
//   res.send(authUrl);
// });

// var drive = google.drive({
//   version: "v3",
//   auth: oAuth2Client,
// });

// const { tokens } = oAuth2Client.getToken();
// console.log(tokens);

// // Handle the callback from the authentication flow
// router.get('/auth/google/callback', async (req, res) => {
//   const code = req.query.code;

//   try {
//     // Exchange the authorization code for access and refresh tokens
//     const { tokens } = await oAuth2Client.getToken(code);
//     const accessToken = tokens.access_token;
//     const refreshToken = tokens.refresh_token;
//     oAuth2Client.setCredentials({ refresh_token: refreshToken, access_token:accessToken });

//     // Save the tokens in a database or session for future use

//     // Redirect the user to a success page or perform other actions
//     console.log('Authentication successful!');
//     res.send('Authentication successful!');
//   } catch (error) {
//     console.error('Error authenticating:', error);
//     res.status(500).send('Authentication failed.');
//   }
// });

// module.exports = router;