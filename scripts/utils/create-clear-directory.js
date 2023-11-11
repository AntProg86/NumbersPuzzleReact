// Работаем с node.js
const fs = require('fs');
const path = require('path');

module.exports = function (directory) {
  try {

    if (!fs.existsSync(directory)){
        fs.mkdirSync(directory);
    }


    removeDir(directory)
  } catch (e) {
    console.error(e);
  }
};

// Удаляем файлы в корне и во вложенных папках build
const removeDir = function(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename)
        } else {
          fs.unlinkSync(path + "/" + filename)
        }
      })
    } else {
      console.log("No files found in the directory.")
    }
  } else {
    console.log("Directory path not found.")
  }
}