const authRoute = require('./auth.route');
const blogRoute = require('./blog.route');
const userRoute = require('./users.route');
const routes = [
  { path: '/auth', route: authRoute },
  { path: '/blog', route: blogRoute },
  { path: '/users', route: userRoute },
];

module.exports = routes;
