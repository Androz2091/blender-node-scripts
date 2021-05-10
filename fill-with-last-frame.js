// this script duplicate the last frame to reach the needed number of frames

if (!process.argv[2]) return console.log('please specify a number of frames');

const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('./input');
const fileFormat = /(\d+)\.exr/;
const numberOfFrames = parseInt(process.argv[2]);
const sortedFiles = files.filter((file) => fileFormat.test(file)).map((file) => parseInt(path.basename(file).match(fileFormat)[1])).sort((a, b) => b - a);
let currentFrameNumber = sortedFiles[0];
while (currentFrameNumber < numberOfFrames) {
    ++currentFrameNumber;
    const fileName = currentFrameNumber.toString().padStart(4, '0');
    const previousFileName = (currentFrameNumber-1).toString().padStart(4, '0');
    console.log(`${fileName}.exr created - based on ${previousFileName}.exr`);
    fs.copyFileSync(path.join(__dirname, 'input', `${previousFileName}.exr`), path.join(__dirname, 'input', `${fileName}.exr`));
}
