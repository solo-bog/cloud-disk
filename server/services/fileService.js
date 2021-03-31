const fs = require('fs');
const config = require('config');
/**
 * Class for work with files
 */
class FileService {
  /**
   * @param {object} file - file which will add in server
   * @return {string} - result of work
   */
  createDir(file) {
    const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`;
    return new Promise(((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({message: 'File was created'});
        } else {
          return reject({message: 'File already exist'});
        }
      } catch (e) {
        return reject({message: 'File error'});
      }
    }));
  }
}


module.exports = new FileService();
