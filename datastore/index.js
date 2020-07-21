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
    if(err) {
      throw err;
    }
    //handle err, if data
    fs.writeFile(`${dataDir}/${dataString}.txt`, text, (err, todo)=>{
      if(err) {
        throw err;
      }
      callback(err, todo);
    })
  })

  // var id = counter.getNextUniqueId();//get data from nextUniqueId
  // items[id] = text; // fs.writeFile()
  // callback(null, { id, text }); //handle error, if not save data
  // });
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
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

