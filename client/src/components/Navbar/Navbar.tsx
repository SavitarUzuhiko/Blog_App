import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { SheetDemo } from './create-post';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/app/store';
import { onOpen } from '@/app/slices/createPost/useCreatePost';

const Navbar = () => {


  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='w-full h-24 bg-gray-900 fixed inset-0'>
      <div className='w-full h-full flex items-center justify-between px-10'>
        <Link to={'/'} className='flex items-center justify-center gap-2 ml-2'>
          <img
            className='w-15 rounded-full'
            src='https://ui.shadcn.com/avatars/shadcn.jpg'
            alt='logo'
          />
          <p className='font-bold text-4xl text-white'>Savitar Uzuhiko</p>
        </Link>
        <div className='flex gap-2'>
          <Button
          onClick={() => dispatch(onOpen())}
            className='rounded-full font-bold min-w-35'
            size={'lg'}
            variant={'outline'}
          >
            Create Post
          </Button>
          <Link to={'/auth'}>
            <Button
              className='rounded-full font-bold min-w-35'
              size={'lg'}
              variant={'default'}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
      <SheetDemo />
    </div>
  );
};

export default Navbar;
