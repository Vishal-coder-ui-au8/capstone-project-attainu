const path = require('path');
const fs = require('fs')


const createDirectory = (directoryPath) => {
    const directory = path.normalize(directoryPath);
  
    return new Promise((resolve, reject) => {
      fs.stat(directory, (error) => {
        if (error) {
          if (error.code === 'ENOENT') {
            fs.mkdir(directory, (error) => {
              if (error) {
                reject(error);
              } else {
                resolve(directory);
              }
            });
          } else {
            reject(error);
          }
        } else {
          resolve(directory);
        }
      });
    });
  }

module.exports = createDirectory;
  