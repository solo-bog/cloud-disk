const fs = require('fs');
/**
 * Class for work with files
 */
class FileService {
  /**
   * @param {object} req - request
   * @param {object} file - file which will add in server
   * @return {string} - result of work
   */
  createDir(req, file) {
    const filePath = this.getPath(req, file);
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
   * @param {object} req - request
   * @param {object} file - file which will delete
   */
  deleteFile(req, file) {
    const path = this.getPath(req, file);
    if (file.type === 'dir') {
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
  /**
   * @param {object} req - request
   * @param {object} file - file for which get path
   * @return {string} - file path
   */
  getPath(req, file) {
    return req.filePath + '\\' + file.user + '\\' + file.path;
  }
}


module.exports = new FileService();
