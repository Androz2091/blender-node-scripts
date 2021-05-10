// this script replaces missing frames by the previous one

const fs = require('fs');
const path = require('path');
const files = fs.readdirSync('./input');
const fileFormat = /(\d+)\.exr/;
const sortedFiles = files.map((file) => parseInt(path.basename(file).match(fileFormat)[1])).sort((a, b) => a - b);
for (let i = sortedFiles[0]; i < sortedFiles[sortedFiles.length - 1]; i++) {
    const fileName = i.toString().padStart(4, '0');
    const previousFileName = (i-1).toString().padStart(4, '0');
    if (!sortedFiles.includes(i)) {
        console.log(`[!] Missing frame ${i}.exr!`);
        fs.copyFileSync(path.join(__dirname, 'input', `${previousFileName}.exr`), path.join(__dirname, 'input', `${fileName}.exr`));
    }
}
