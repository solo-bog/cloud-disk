const Router = require('express');
const router = new Router();
const teacherController = require('../controllers/teacherController');

router.get('', teacherController.getTeachers);

module.exports = router;
