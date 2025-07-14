const router = require("express").Router();
const userController = require("../controllers/users.controller");
const { expressValidate } = require("../validators");

router.get("/all" , expressValidate, userController.getAllUsers);
router.get("/get-user/:userId", expressValidate, userController.getUserById);
router.post('/setRole/:userId' ,expressValidate , userController.setRole);

module.exports = router;