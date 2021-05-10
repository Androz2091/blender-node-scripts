// this script renders the image sequence as a video using ffmpeg

const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('./input');
const fileFormat = /(\d+)\.exr/;
const sortedFiles = files.filter((file) => fileFormat.test(file)).map((file) => parseInt(path.basename(file).match(fileFormat)[1])).sort((a, b) => a - b);
const minFrame = sortedFiles[0];

const outFiles = fs.readdirSync('./output');
const outFileFormat = /(\d+)\.mp4/;
const sortedOutFiles = outFiles.filter((file) => outFileFormat.test(file)).map((file) => parseInt(path.basename(file).match(outFileFormat)[1])).sort((a, b) => a - b);
const maxOut = sortedOutFiles[sortedOutFiles.length-1] || 0;

//const command = `ffmpeg -r 24  -f image2 -s 1920x1080 -start_number ${minFrame} -i input/%04d.exr -i sound.mp3 -vframes 1000 -vf curves=strong_contrast -vcodec libx264 -crf 25  -pix_fmt yuv420p output/${maxOut+1}.mp4`;
const command = `ffmpeg -apply_trc iec61966_2_1 -r 24 -start_number ${minFrame} -i input/%04d.exr -i sound.mp3 -vcodec mpeg4 -c:v libx264 -crf 20 -c:a aac -strict -2 output/${maxOut+1}.mp4`;
console.log(`Running ${command}`);
exec(command);
