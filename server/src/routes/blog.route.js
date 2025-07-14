const blogController = require("../controllers/blog.controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");
const upload = require("../utils/upload.js");
const { expressValidate } = require("../validators/index.js");

const router = require("express").Router();

router.post('/add', upload.single("imageFile") , expressValidate , blogController.addPost);
// router.post('/add', authMiddleware, upload.single("imageFile") , expressValidate , blogController.addPost);
router.get('/all',  blogController.getAllPosts);
router.put('/update/:blogId',  authMiddleware , upload.single("blogImage") , expressValidate , blogController.updatePost);
router.delete('/delete/:blogId', expressValidate , blogController.deletePost);

module.exports = router;