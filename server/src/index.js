const express = require('express');
const {port} = require("./utils/secret.js");
const configDB = require('./utils/db.js');
const { errorMiddleware } = require('./middlewares/error.middleware.js');
const routes = require('./routes/index.js');
const cors =require('cors')
const cookieParser = require('cookie-parser')
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser({}))
app.use(express.static(path.join(__dirname,'../public/')));
app.use(cors({origin: '*'}))

routes.forEach(route => app.use(route.path , route.route));

app.use(errorMiddleware);

app.listen(port , async () => {
  await configDB();
  console.log(`Server running on port http://localhost:${port}`);
})
