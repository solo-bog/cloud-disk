const fileService = require('../services/fileService');
const File = require('../models/File');
const User = require('../models/User');
const config = require('config');
const fs = require('fs');
/**
 * Class for work with files
 */
class FileController {
  /**
     * @param {object} req - request
     * @param {object} res - response
     * @return {object} res - response with id created directory
     */
  async createDir(req, res) {
    try {
      const {name, type, parent} = req.body;
      const file = new File({name, type, parent, user: req.user.id});
      const parentFile = await File.findOne({_id: parent});
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(file);
        parentFile.children.push(file._id);
        await parentFile.save;
      }
      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  /**
     * @param {object} req - request
     * @param {object} res - response
     * @return {object} res - response with files of user
     */
  async getFiles(req, res) {
    try {
      const files = await File.find({user: req.user.id, parent: req.query.parent});
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: 'Can not get files'});
    }
  }
  /**
   * @param {object} req - request
   * @param {object} res - response
   * @return {object} res - response with files of user
   */
  async uploadFile(req, res) {
    try {
      const file = req.files.file;
      const parent=await File.findOne({user: req.user.id, _id: req.body.parent});
      const user = await User.findById(req.user.id);
      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({message: 'There no space on the disk'});
      }
      user.usedSpace = user.usedSpace + file.size;
      let path;
      if (parent) {
        path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${config.get('filePath')}\\${user._id}\\${file.name}`;
      }
      if (fs.existsSync(path)) {
        return res.status(400).json({message: 'File already exist'});
      }
      file.mv(path);
      const type = file.name.split('.').pop();
      let parentPath;
      let parentId;
      if (parent) {
        parentPath = parent.path;
        parentId = parent._id;
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parentPath,
        parent: parentId,
        user: user._id,
      });
      await dbFile.save();
      await user.save();
      return res.json(dbFile);
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: 'Upload error'});
    }
  }
}

module.exports = new FileController();
