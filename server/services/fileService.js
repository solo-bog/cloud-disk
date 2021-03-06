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
    const filePath = this.getPath(file);
    return new Promise(((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({message: 'File was created'});
        } else {
          return reject({message: `File "${file.name}" already exist`});
        }
      } catch (e) {
        return reject({message: 'File error'});
      }
    }));
  }
  /**
   * @param {object} file - file which will delete
   */
  deleteFile(file) {
    const path = this.getPath(file);
    if (file.type === 'dir') {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
  /**
   * @param {object} file - file for which get path
   * @return {string} - file path
   */
  getPath(file) {
    return config.get('filePath') + '\\' + file.user + '\\' + file.path;
  }
}


module.exports = new FileService();
