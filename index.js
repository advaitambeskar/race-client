/*
    Create a server using Axios and attempt to connect it to an AWS instance
    Author: Advait Ambeskar

    Disclaimer: I have used the documentation heavily while creating this service.
    I have not provided any annotations, and thus this code cannot be put into production.

    Please note that I have not used passport.js for authentication.
    The idea of using passport.js is standardized through key-matching, but for efficiency of prototype
    I used axios headers.

    Additionally, I would have used helmet.js if I had a little more time to prevent security attacks
    from the middleware

    While [express.js/node.js] implementation is workable, for building a scalable system, it is not a
    preferred option. This has to do with the non-blocking single-threaded IO architecture that NODE.js uses 
    I will speak to you more about this on a later date, if you wish to discuss this in depth.

    This implementation is not the most efficient, but it is a quick prototype.
    I apologize for my writing technique.
    It is not the most clean code (too much tech debt) but I wrote this while in-flight.
    I have tried to add as much in-code documentation as possible to allow you to understand without actually
    reading my code.

    I am using in-memory file-read for this. There are alternatives to this like using filestream, which
    reduces the overall file-load


    [TODO]: UPDATE THE README.md FILE.    
    [TODO]: USE PASSPORT HERE TO AUTHENTICATE INSTEAD OF AXIOS HEADERS
*/

// creating an express client-side.
// using axios for http connections. RESTful communication is efficient and managable.
// filesystem for reading files
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const [config] = require('./config');

// file path for json file
const filePath = './res/file.txt';

// hosting client on localhost:3000/ will display just some console messages honestly.
// You might not need to use the browser for this implementation.
const app = express();
const PORT = 8080;

// change this for reading new kinds of data.
const randomNumber = 5; // between 1-20 (?)
var totalLines = 0;
var jsonData = {};
var isFirstRead = true;


// per user hash is generated through bcrypt
// this acts the same way as the password has been entered
// In essence, I have used a secret passcode, that needs to be checked by the server (CS)
// before it can allow the user
// to communicate with its system. It is a binary lock, if the passcode is correct, only then
// does the server communicate.
// The idea for this is actually from configuration file formats
// the hash and the RPi Id can be obtained from a config file for the RPi and that can be used to authenticate

var hash = bcrypt.hashSync(config.hash, 8);
var RPiId = config.source;


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.listen(PORT, async () => {
    console.log('App has started!')
    isFirstRead = true

    console.log([jsonData, totalLines, isFirstRead]);

    // We can move this entire operation to be a function call later
    [jsonData, totalLines, isFirstRead] = await readFile(filePath, totalLines, isFirstRead);



    // [TODO]: axios configure and then add headers/ should be the same on the server
    // https://stackoverflow.com/questions/45578844/how-to-set-header-and-options-in-axios

    for (let i = 0; i < totalLines; i++) {
        // await sleep(1000);
        // console.log('here');

        // I am reading the file and updating the in-memory cache each 10,000 iterations. This was better than reading the file
        // after every short amount of time, because this way, we can control the entire process flow based on 
        // processing capacity.
        if (i % 10000 == 0) {
            [jsonData, totalLines, isFirstRead] = await readFile(filePath, totalLines, isFirstRead);
        }

        if (i % 5 != 0) {
            // header is right. I will add passport.js support to this later when I have the time.
            // Currently using axios header properties to send a 'string'
            // think about this as a b-crypt implementation (I have hashed a string and now I am sending it to be
            // decrypted. I just did not use b-crypt because it was not on my local storage.)
            // ofcourse I am not using an actual b-crypt which is an actual hashing function...

            await sendDataRightHeader('RPS1', jsonData[i], hash, RPiId);

        } else {
            // header is wrong.

            await sendDataWrongHeader('RPS2', jsonData[i], hash, RPiId);
        }

    }
});

function readFile(filePath, totalLines, isFirstRead) {
    const jsonData = JSON.parse(fs.readFileSync(filePath))['Sheet1'];
    if (isFirstRead) {
        totalLines = jsonData.length;
        isFirstRead = false;
        return [jsonData, totalLines, isFirstRead];
    } else {
        if (jsonData.length != totalLines) {
            totalLines = jsonData.length;
            isFirstRead = false;
            return [jsonData, totalLines, isFirstRead];
        }
        return [jsonData, totalLines, isFirstRead];
    }
}

//[TODO]: Add IP address instead or link for the server
// https://stackoverflow.com/questions/52613527/how-to-send-clientip-in-request-headers-using-axios
async function sendDataRightHeader(author, jsonData, hash, sourceKey) {
    let config = {
        headers: {
            sourceKey: sourceKey,
            hash: hash,
        }
    }
    await axios.post('http://localhost:3001/inserts/', { author: author, data: jsonData }, config)
        .then((res) => {
            console.log(res.data);
        });
}

async function sendDataWrongHeader(author, jsonData, hash, sourceKey) {
    let config = {
        headers: {
            sourceKey: '123',
            hash: hash,
        }
    }
    await await axios.post('http://localhost:3001/inserts/', { author: author, data: jsonData }, config)
        .then((res) => {
            console.log(res.data);
        });
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}