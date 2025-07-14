const userModel = require('../model/user.model');
const HttpException = require('../utils/http-exception');
const bcrypt = require('bcrypt');
const { adminSecret } = require('../utils/secret');


class UserController {
  async getAllUsers(req, res) {
    const users = await userModel.find({});
    res.status(200).json({ success: true, users });
  }

  async getUserById(req, res) {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) {
      throw new HttpException(404, 'User not found');
    }
    res.status(200).json({ success: true, user });
  }

  async setRole(req, res) {
    const { userId } = req.params;
    const { adminPass , role} = req.body;
    const user = await userModel.findById(userId);
    let newData

    if (!user) {
      throw new HttpException(404, 'User not found');
    }

    if (adminPass !== adminSecret)
      throw new HttpException(401, 'Password is incorrect');

    if(!role)
      newData = await userModel.findByIdAndUpdate(userId, {role:"user"})

    newData = await userModel.findByIdAndUpdate(userId, {role})
    res.status(201).json({ success: true, newData });
  }
}

module.exports = new UserController();
