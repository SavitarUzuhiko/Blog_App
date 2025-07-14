const jwt = require('jsonwebtoken')
const {accessToken,refreshToken} = require('../utils/secret')
const tokenModel = require('../model/token.model')
class TokenService {
  generateToken(payload){
    const jwtaccessToken = jwt.sign(payload , accessToken , {expiresIn:'15m'})
    const jwtrefreshToken = jwt.sign(payload , refreshToken , {expiresIn:'30d'})

    return {jwtaccessToken,jwtrefreshToken}
  }

  async saveToken(userId,refreshToken) {
    const existToken = await tokenModel.findOne({user:userId})

    if(existToken){
      existToken.refreshToken = refreshToken
      return existToken.save()
    }

    const token = await tokenModel.create({user:userId,refreshToken})
    return token
  }
}

module.exports = new TokenService()