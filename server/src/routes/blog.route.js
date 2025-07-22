const blogController = require("../controllers/blog.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const authorMiddleware = require("../middlewares/author.middleware.js");
const upload = require("../utils/upload.js");
const { expressValidate } = require("../validators/index.js");

const router = require("express").Router();

router.get('/all',  blogController.getAllPosts);
router.get('/get-one/:blogId',  blogController.getOne);
router.post('/add', authMiddleware, upload.single("imageFile") , expressValidate , blogController.addPost);
router.put('/update/:blogId',  authMiddleware , authorMiddleware , upload.single("blogImage") , expressValidate , blogController.updatePost);
router.delete('/delete/:blogId', authMiddleware, authorMiddleware, expressValidate , blogController.deletePost);

module.exports = router;
