const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf; //look into this!

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

//returns zero padded number version of the argument
const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};


//reads the counter and handles the error
const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

//writes the counter and handles the error
const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count); //007
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// should use error first callback pattern
//Your first goal is to save the current state of the counter to the hard drive, so it's persisted between server restarts. Do this by rewriting getNextUniqueId to make use of the provided readCounter and writeCounter functions.
// run readCounter then whatever that returns add one then add it to writeCounter
exports.getNextUniqueId = (callback) => { //getting the next unique id for the counter, decalring a function

  readCounter((err, data) => {
    writeCounter(data + 1, (err, dataString) => {
      callback(err, dataString);
    });
  });
  // counter = counter + 1; //reassign the counter to be counter+1
  // return zeroPaddedNumber(counter); // return the counter as the zeroPaddedNumber
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
