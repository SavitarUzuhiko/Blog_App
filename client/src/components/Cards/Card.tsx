import type { Blog } from '@/app/api/blogApi/type';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { baseUrl } from '@/app/api/baseApi/baseApi';
import { Button } from '../ui/button';
import { useDeleteBlogMutation, useLazyGetAllBlogsQuery } from '@/app/api/blogApi/blogApi';
import { toast } from 'sonner';
import { setEditor } from '@/app/slices/createPost/useCreatePost';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';

const Cards = ({ post }: { post: Blog }) => {



  const [deleteBlog] = useDeleteBlogMutation();
  const [getAllBlogs] = useLazyGetAllBlogsQuery();
  const dispatch = useDispatch();

  const onDelete = async () => {
    const {data} = await deleteBlog(post._id);
    console.log(data?.success);
    getAllBlogs({});  

    if(data && data.success){
      toast.success('Post deleted successfully');
    }else{
      toast.error('Failed to delete post');
    }
  }

  return (
    <Card>
      <CardHeader>
        <img
        src={baseUrl + '/' + post.image}
        alt={post ? post.image?.toString() : 'Picture'}
        className='rounded-sm aspect-video object-contain w-full'
      />
      </CardHeader>
      <CardContent>
        <CardTitle className='line-clamp-1'>{post.title}</CardTitle>
        <p className='line-clamp-2 mt-1 text-muted-foreground'>{post.content}</p>
      </CardContent>
      <CardFooter className='grid grid-cols-2 space-x-2'>
        <Button onClick={() => dispatch(setEditor(post))}>Edit</Button>
        <Button className='bg-red-500 ' variant={'destructive'} onClick={onDelete}>Delete</Button>
      </CardFooter>
    </Card>
  );
};

export default Cards;
