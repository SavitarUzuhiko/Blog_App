import { useGetAllBlogsQuery } from '@/app/api/blogApi/blogApi';
import type { Blog } from '@/app/api/blogApi/type';
import Cards from '@/components/Cards/Card';
import PostLoading from '@/components/Cards/Post-Loading';

const HomePage = () => {
  // const
  const { data, isFetching, isError } = useGetAllBlogsQuery({});

  const blog: Blog[] | undefined = data && data.blogs;

  console.log(blog);
  return (
    <>
      <div className='container max-w-7xl mx-auto mt-26'>
        <div className='grid grid-cols-4 gap-5'>
          {isFetching &&
            Array.from({ length: 8 }).map((_, idx) => <PostLoading key={idx} />)}
          {blog?.map((post: Blog) => (
            <Cards key={String(post._id)} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
