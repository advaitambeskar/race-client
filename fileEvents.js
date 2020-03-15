// const fs = require('fs');
// const EventEmitter = require('events').EventEmitter;
// const fileEvents = new EventEmitter;

// // getting the global variables needed
// var globalCopy = require('./index');


// //emit fileEvents.emit('checkNewEntry', [oldFileLength, filePath]);
// fileEvents.on('checkNewEntry', ([oldFileLength, oldFileCopy, filePath]) => {
//     const rawJson = JSON.parse(fs.readFileSync(filePath))['Sheet1'];
//     const copy = {};
//     console.log('global copy');
//     console.log(globalCopy);
//     if (oldFileLength < rawJson.length) {
//         copy = rawJson;
//     } else {
//         copy = oldFileCopy;
//     }
//     oldFileCopy = copy;
// });

// fileEvents.on('fileInitialize', ([filePath, fileContent]) => {
//     const rawJson = JSON.parse(fs.readFileSync(filePath))['Sheet1'];
//     console.log(rawJson);
//     var copy = {};
//     console.log('global copy');
//     console.log(globalCopy);
    
//     if (rawJson != undefined) {
//         copy = rawJson;
//     } else {
//         console.error('Cannot read the file. Operation failed');
//         copy = {};
//     }
//     globalCopy= {jsonData: rawJson, jsonlength: rawJson.length, currentLine:0};
//     console.log(globalCopy);
//     console.log('global copy over');
// });

// module.exports = { fileEvents: fileEvents };