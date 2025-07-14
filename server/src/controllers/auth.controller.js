const userModel = require('../model/user.model.js');
const HttpException = require('../utils/http-exception.js');
const bcrypt = require('bcrypt');
const TokenService = require('../utils/generateToken.js');
const tokenModel = require('../model/token.model.js');
const  {refreshToken:refresh} = require('../utils/secret.js');
const jwt = require('jsonwebtoken')
const mailService = require('../utils/mail.js');
const secret = require('../utils/secret.js');

class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      throw new HttpException(400, 'All fields are required');
    }

    const existingUser = (await userModel.findOne({ email }))

    if (existingUser) {
      throw new HttpException(400, 'User already exists');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userModel.create({ name, email, password: hashed });
    const datas = { id: user._id, name: user.name, email: user.email };

    await mailService.sendMail(user.email, secret.api_url+'auth/activation/'+user._id);

    const tokens = TokenService.generateToken(datas);

    await TokenService.saveToken(user._id, tokens.jwtrefreshToken);

    res.cookie('refreshToken', tokens.jwtrefreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Send response
    res.status(201).json({
      success: true,
      user: datas,
      ...tokens,
    });
  }

  async activation(req, res, next) {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    if (!user) throw new HttpException(404, 'User not found');

    
    user.isActivated = true;
    await user.save();
    
    return res.redirect(secret.portal);
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) throw new HttpException(400, 'User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new HttpException(400, 'Password is incorrect');

    const datas = { id: user._id, name: user.name, email: user.email };

    const tokens = TokenService.generateToken({
      email: user.email,
      id: user._id,
    });

    await TokenService.saveToken(user._id, tokens.jwtrefreshToken);

    res.cookie('refreshToken', tokens.jwtrefreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      success: true,
      user: datas,
      ...tokens,
    });
  }

  async logout(req, res, next) {
    const { refreshToken } = req.cookies;

    if (refreshToken === null)
      throw new HttpException(204, 'No token provided');

    const token = await tokenModel.findOneAndDelete({ refreshToken });
    res.clearCookie('refreshToken');
    return res.json({ token: token.refreshToken });
  }

  async refresh(req, res, next) {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      throw new HttpException(400, 'No token provided');

    const userPayload = jwt.verify(refreshToken, refresh);
    if (!userPayload || !userPayload.id)
      throw new HttpException(403, 'Invalid token');

    
    const findToken = await tokenModel.findOne({ refreshToken });
    if (!findToken)
      throw new HttpException(403, 'Refresh token not found in DB');
    
    const user = await userModel.findById(userPayload.id);
    
    if(!user) throw new HttpException(404, 'User not found');

    const tokens = TokenService.generateToken({ id: user._id, email: user.email });

    await TokenService.saveToken(user._id, tokens.jwtrefreshToken);

    res.cookie('refreshToken', tokens.jwtrefreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({
      success: true,
      id: user._id,
      email:user.email,
      ...tokens,
    });
  }
}

module.exports = new AuthController();
