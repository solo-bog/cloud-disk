const {model, Schema} = require('mongoose');

const Teacher = new Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  middleName: {type: String, required: true},
});

module.exports = model('Teacher', Teacher);
