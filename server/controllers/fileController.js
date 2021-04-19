const fileService = require('../services/fileService');
const File = require('../models/File');
const User = require('../models/User');
const fs = require('fs');
const uuid = require('uuid');
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
        await fileService.createDir(req, file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await fileService.createDir(req, file);
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
      const {sort} = req.query;
      let files;
      switch (sort) {
        case 'name':
          files = await File.find({user: req.user.id, parent: req.query.parent}).collation({locale: 'en'}).sort({name: 1});
          break;
        case 'type':
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1});
          break;
        case 'date':
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1});
          break;
        case 'size':
          files = await File.find({user: req.user.id, parent: req.query.parent}).sort({size: 1});
          break;
        default:
          files = await File.find({user: req.user.id, parent: req.query.parent});
          break;
      }
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
      const parent = await File.findOne({user: req.user.id, _id: req.body.parent});
      const user = await User.findById(req.user.id);
      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({message: 'There no space on the disk'});
      }
      user.usedSpace = user.usedSpace + file.size;
      let path;
      if (parent) {
        path = `${req.filePath}\\${user._id}\\${parent.path}\\${file.name}`;
      } else {
        path = `${req.filePath}\\${user._id}\\${file.name}`;
      }
      if (fs.existsSync(path)) {
        return res.status(400).json({message: 'File already exist'});
      }
      file.mv(path);
      const type = file.name.split('.').pop();
      let filePath = file.name;
      let parentId;
      if (parent) {
        filePath = parent.path + '\\' + file.name;
        parentId = parent._id;
        parent.size += file.size;
        await parent.save();
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
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
  /**
   * @param {object} req - request
   * @param {object} res - response
   * @return {object} res - response with id created directory
   */
  async downloadFile(req, res) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id});
      const path = fileService.getPath(req, file);
      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(400).json({message: 'Download error'});
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: 'Download error'});
    }
  }
  /**
   * @param {object} req - request
   * @param {object} res - response
   * @return {object} res - response
   */
  async deleteFile(req, res) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id});
      const user = await User.findOne({_id: req.user.id});
      if (!file) {
        return res.status(400).json({message: 'file not found'});
      }
      if (file.parent) {
        const parent = await File.findOne({_id: file.parent});
        parent.size -= file.size;
        user.usedSpace-=file.size;
        await parent.save();
        await user.save();
      }
      fileService.deleteFile(req, file);
      await file.remove();
      return res.status(200).json({message: 'File was deleted'});
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'Dir is not empty'});
    }
  }
  /**
   * @param {object} req - request
   * @param {object} res - response
   * @return {object} res - response with searched files
   */
  async searchFile(req, res) {
    try {
      const searchName = req.query.search;
      let files = await File.find({user: req.user.id});
      files = files.filter((file) => file.name.includes(searchName.toLowerCase()) || file.name.includes(searchName.toUpperCase()));
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'Search error'});
    }
  }
  /**
   * @param {object} req - request
   * @param {object} res - response
   * @return {object} res - response
   */
  async uploadAvatar(req, res) {
    try {
      const file = req.files.file;
      const user = await User.findById(req.user.id);
      const avatarName = uuid.v4() + '.jpg';
      file.mv(req.staticPath + '\\' + avatarName);
      user.avatar = avatarName;
      await user.save();
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'Upload avatar error'});
    }
  }
  /**
   * @param {object} req - request
   * @param {object} res - response
   * @return {object} res - response
   */
  async deleteAvatar(req, res) {
    try {
      const user = await User.findById(req.user.id);
      fs.unlinkSync(req.staticPath + '\\' + user.avatar);
      user.avatar = null;
      await user.save();
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({message: 'Delete avatar error'});
    }
  }
}

module.exports = new FileController();
