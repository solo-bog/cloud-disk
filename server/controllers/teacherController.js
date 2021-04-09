const Teacher = require('../models/Teacher');

/**
 * Class for work with teachers
 */
class TeacherController {
  /**
     * @param {object} req - request
     * @param {object} res - response
     * @return {object} res - response with teachers
     */
  async getTeachers(req, res) {
    try {
      const teachers = await Teacher.find({}); // find all teachers in DB
      return res.json(teachers); // return response with teachers in JSON format
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: 'Can not get teachers'});
    }
  }
}

module.exports = new TeacherController();
