const fileService = require('../services/fileService');
const File = require('../models/File');

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
      console.log('new');
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
}

module.exports = new FileController();
