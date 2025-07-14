require('dotenv').config();


const secrets = {
  port : process.env.PORT || 5000,
  mongo_uri : process.env.MONGO_URI || 'mongodb://localhost:27017/blog_platform',
  adminSecret : process.env.ADMIN_SECRET || '123456',
  accessToken : process.env.JWT_SECRET_KEY || '123456',
  refreshToken : process.env.JWT_REFRESH_KEY || '1234567',
  smtp_host : process.env.SMTP_HOST || 'smtp.gmail.com',
  smtp_port : process.env.SMTP_PORT || 587,
  smtp_user : process.env.SMTP_USER || 'miyuratatsu@gmail.com',
  smtp_password : process.env.SMTP_PASSWORD || 'qgbh mnol xlgh bzjj',
  api_url: process.env.API_URL || 'http://localhost:5000/',
  portal: process.env.PORTAL || 'http://localhost:5173/'
}



module.exports = secrets;
