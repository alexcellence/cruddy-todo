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
      })
    }
  })

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
    if(err) {
      callback(err, null);
    } else {
      if(files.length === 0){
        callback(err, []);
      }else {

        var todoList = _.map(files, (file) => {
          fs.readFile(file, (err, data)=>{
        console.log('data is ', data)
        console.log('file is ', file)
            return {id: file, text: file};
          })
        })
        callback(err, todoList);
      }
    }
  })



  // //if dataDir has lengthOf 0,
  // if (exports.dataDir.length === 0) {
  //   //error first callback function with (err, [])
  //   callback(err, []);
  // } else {
  //   //else we will readFile and run error first callback function
  //   fs.readFile(`${exports.dataDir}`, (err, todoList) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       // with the acquired data, transform it to the correct spec.
  //       var list = _.map(todoList, (text, id) => {
  //         return {id: id, text: id};
  //       })
  //       callback(err, list);
  //     }
  //   })
  // }
  //

  //-----------------------------------------------
  //decalring a variable data = mapping over the item object,
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
    // [{id: '0', text: '0'},{id: '1', text: '1'}, {id: '2', text: '2'}]
  // });

  // callback(null, data);
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

