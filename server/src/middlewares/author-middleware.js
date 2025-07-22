
const model = require('../model/blog.model');

module.exports = async function (req,res,next) {
  const post = await model.findById(req.params.blogId);
  const authorId = req.user.id;

  if(post.author !== authorId) throw new HttpException(403, 'You are not authorized to update this post');
  next()
}
