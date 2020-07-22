const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

// need to make async, fs.writeFile
exports.create = (text, callback) => {
  // use fs.writeFile takes three parameters: name of new file (getNextUniqueID), data in file (text), callback
  // this won't work

  counter.getNextUniqueId((err, dataString)=> {
    //handle err, if data
    if (err) {
      throw err;
    } else {
      fs.writeFile(`${exports.dataDir}/${dataString}.txt`, text, (err)=>{
        if (err) {
          throw err;
        } else {
          //create an object literal using text variable
          callback(err, {text: text.toString(), id: dataString});
        }
      });
    }
  });

  // var id = counter.getNextUniqueId();//get data from nextUniqueId
  // items[id] = text; // fs.writeFile()
  // callback(null, { id, text }); //handle error, if not save data
  // });
  // items[id] = text;
  // callback(null, { id, text });
};

// read the directory (use fs.readFile)
// build a list of files array type with each todo that are objects
// id is important

//readAll is a function that takes a callback function as a parameter.
exports.readAll = (callback) => {
  fs.readdir(`${exports.dataDir}`, (err, files)=>{
    if (err) {
      callback(err, null);
    } else {
      if (files.length === 0) {
        callback(err, []);
      } else {

        var todoList = _.map(files, (text, id)=>{
          var fileName = path.basename(text, '.txt');
          return {id: fileName, text: fileName};
        });
        // var todoList = _.map(files, (file) => {
        // /
        //   console.log('file is', file)
        //   fs.readFile(`${exports.dataDir}/${fileName}.txt`, (err, data)=>{
        //     return {id: fileName, text: fileName};
        //   });
        // });
        callback(err, todoList);
      }
    }
  });
};

exports.readOne = (id, callback) => {
  // first we want to read all files
  exports.readAll((err, todoList) => {
    if (err) {
      callback(err, null);
    } else {
      // iterate through the list of files
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].id === id) {
          var text = todoList[i].text;
          callback(null, {id, text});
        } else {
          callback(err, null);
        }
      }
    }
  })
    // find an object with the given id
    // in callback function give (null, object)

  //----------------------------------------
  // var text = items[id];//find the object that has the given id in the storage
  // if (!text) { // if we don't have it, we throw error
  //   callback(new Error(`No item with id: ${id}`));
  // } else { // else we send that given id and found text to the callback function
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

//review existsSync & mkdirSync
exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};

