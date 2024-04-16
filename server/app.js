// express imported
const express = require('express');
const app = express();
var cors = require('cors')
const fileUpload = require('express-fileupload')
// const createClientDrive = require('./driveUploadFunctions/configDriveClient');


const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
// const token = require('fs').readFileSync('token.json');


const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');


async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}


async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}


async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

async function listFiles(authClient) {
    const drive = google.drive({ version: 'v3', auth: authClient });
    const res = await drive.files.list({
        pageSize: 10,
        fields: 'nextPageToken, files(id, name)',
    });
    const files = res.data.files;
    if (files.length === 0) {
        console.log('No files found.');
        return;
    }

    console.log('Files:');
    files.map((file) => {
        console.log(`${file.name} (${file.id})`);
    });
}


authorize().then(listFiles).catch(console.error);

// read token file as json
// const tokenJson = JSON.parse(token);
// console.log('Refresh token: ', tokenJson.refresh_token);

app.use(cors())

// credentials import
require('dotenv').config();

// connection established
require('./mongoDb/connection');

// const clientDrive = createClientDrive();

const PORT = process.env.PORT || 5001

app.use(fileUpload({
    useTempFiles: true
}))

// components Maintained
app.use(express.json());
app.use(require('./router/loginAuth'));
app.use(require('./router/studentSide'));
app.use(require('./router/googleAuth'));
app.use(require('./router/researchSide'));
app.use(require('./router/researchSide'));
app.use(require('./router/facultySide'));
app.use(require('./router/sharedFunctions'));
app.use(require('./router/accountSide.js'));
app.use(require('./router/loginAuth'));
app.use(require('./router/hodSide'));
app.use(require('./router/deanSide'));


app.get('/login', (req, res) => {
    res.send(`Hi`);
})

app.listen(PORT, () => {
    console.log('server is running at ' + PORT)
})
