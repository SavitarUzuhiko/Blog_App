const { RegistrValidate , expressValidate} = require("../validators");
const AuthController = require("../controllers/auth.controller");
const router = require("express").Router();

router.post('/registr' , RegistrValidate.add() , expressValidate , AuthController.register);
router.post('/login' , RegistrValidate.login() , expressValidate , AuthController.login);
router.post('/logout'  , expressValidate , AuthController.logout);
router.get('/activation/:id'  , expressValidate , AuthController.activation);
router.get('/refresh' , expressValidate , AuthController.refresh);

module.exports = router