const fs = require("fs/promises");
const util = require("util");

// Promise version of fs.readFile
// const readFromFile = util.promisify(fs.readFile);
const readFromFile = fs.readFile;

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */

// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4))
    .then (() => console.info(`\nData written to ${destination}`))
    .catch ((err) =>
        console.error(err));

    /**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */

// const readAndAppend = (content, file) => {
//     fs.readFile(file, "utf-8", (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             const parsedData = JSON.parse(data);
//             parsedData.push(content);
//             writeToFile(file, parsedData);
//         }
//     });
// }

const readAndAppend = async (content, file) => {
    try {
        const data = await fs.readFile(file, "utf-8");
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);     
    } catch (err) {
        console.error(err)
    }
}

module.exports = { readFromFile, writeToFile, readAndAppend };