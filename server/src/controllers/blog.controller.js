const blogModel = require('../model/blog.model');
const userModel = require('../model/user.model');
const HttpException = require('../utils/http-exception');

class BlogController {
  async addPost(req, res) {
    const { title, content } = req.body;
    const imageFile = req.file;

    if (!title || !content) {
      throw new HttpException(400, 'All fields are required');
    }

    const newPost = await blogModel.create({
      title,
      content,
      // author: req.user.id,
      image: imageFile ? ('images/'+ imageFile?.filename) : null,
    });

    res.status(201).json({ success: true, post: newPost });
  }

  async getAllPosts(req, res) {
    const { page=1, limit=10 , search} = req.query;

    let searched = {};

    if(search){
      searched = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      }
    }

    const blogs = await blogModel.find(searched).skip((page-1)*limit).limit(limit);
    const total = await blogModel.countDocuments();
    res.status(200).json({ success: true, blogs, page, limit , total});
  }

  async updatePost(req, res) {
    const { blogId } = req.params;
    const { title, content } = req.body;
    const imageFile = req.file;

    const item = await blogModel.findById(blogId);
    if(!item){
      throw new HttpException(404, 'Post not found');
    }

    if (item.author.toString() !== req.user.id.toString()) {
      throw new HttpException(
        401,
        'You are not authorized to update this post'
      );
    }

    if (title) {
      item.title = title;
    }
    if (content) {
      item.content = content;
    }
    if (imageFile) {
      item.image = imageFile?.filename || null;
    }

    const updatedPost = await blogModel.findByIdAndUpdate(blogId, item, {
      new: true,
    });

    res.status(200).json({ success: true, post: updatedPost });
  }

  async deletePost(req, res) {
    const { blogId } = req.params; // blogId
    const item = await blogModel.findById(blogId);

    if (!item) {
      throw new HttpException(404, 'Post not found');
    }

    if (item.author !== req.user.id.toString()) {
      throw new HttpException(
        401,
        'You are not authorized to delete this post'
      );
    }

    const deletedPost = await blogModel.findByIdAndDelete(blogId);
    res.status(200).json({ success: true, post: deletedPost });
  }
}

module.exports = new BlogController();
