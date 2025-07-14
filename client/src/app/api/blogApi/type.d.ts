export type Blog = {
  _id: String;
  title: String;
  content: String;
  author?: Author;
  image: String | null;
};

export type GetResponse = {
  success: boolean;
  blogs: Blog[];
  page: String;
  limit: String;
  total: Number;
};

export type GetRequest = {
  page?: Number;
  limit?: Number;
};

type Author = {
  _id: String;
  name: String;
};

export type PostResponse = {
  success: boolean;
  post: Post;
};

type Post = {
  title: String;
  content: String;
  image: String;
};
