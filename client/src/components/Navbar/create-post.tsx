import { onClose } from '@/app/slices/createPost/useCreatePost';
import type { RootState } from '@/app/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type z from 'zod';
import { formSchema } from '@/lib/validation';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useState, type ChangeEvent } from 'react';
import {
  useLazyGetAllBlogsQuery,
  usePostBlogMutation,
} from '@/app/api/blogApi/blogApi';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';

export function SheetDemo() {
  const { isOpen , data: blogData } = useSelector((state: RootState) => state.createPost);
  const dispatch = useDispatch();
  const [postBlog] = usePostBlogMutation();
  const [getAllBlogsTrigger] = useLazyGetAllBlogsQuery();

  const [picture, setPicture] = useState<File | null>(null);

  const onFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];
    if (file) setPicture(file as File);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!picture) return null;

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.body);
    formData.append('imageFile', picture);

    const dataform = await postBlog(formData).unwrap();

    if (dataform && dataform.success) {
      toast.success('Post created successfully');
    } else {
      toast.error('Failed to create post');
    }

    dispatch(onClose());
    form.reset();
    getAllBlogsTrigger({});
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(onClose())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create your Post</SheetTitle>
        </SheetHeader>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 px-6'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Create a blog post'
                      className='bg-secondary'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='body'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea
                      className='min-h-40'
                      placeholder='In this article you can improve ...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Label htmlFor='picture'>Picture</Label>
              <Input
                type='file'
                id={'picture'}
                className='bg-secondary'
                onChange={onFileChange}
              />
            </div>
            <Button type='submit'>Submit</Button>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
