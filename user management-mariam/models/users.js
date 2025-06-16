const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true
  },
  Image: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;