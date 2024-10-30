"use client"

import * as z from 'zod';
import Heading from '@/components/heading'
import { MessageSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { formSchema } from './constants'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';

interface ImageState {
    data: string | Blob | null; // State variable to hold image data
    loading: boolean;
    error: string | null;
  }
  
  const initialState: ImageState = {
    data: null,
    loading: false,
    error: null,
  };

const ConversationPage = () => {
    const [images, setImages] = useState(initialState);
    const [prompt, setPrompt] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setPrompt("")
        const response = await fetch(`https://image.pollinations.ai/prompt/${form.getValues().prompt}`);
        const imageData: string | Blob = await response.blob();
        setImages({ data: imageData, loading: false, error: null });
        setPrompt(values.prompt)
    }
  return (
    <div>
        <Heading 
            title='Image Generation'
            description='Turn your prompt into an image'
            icon={MessageSquare}
            iconColor='text-pink-500'
            bgColor='bg-pink-500/10'
        />
        <div className='px-4 lg:px-8'>
            <div>
                <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid-cols-12 gap-2'
                    >
                        <FormField 
                            name='prompt'
                            render={({ field }) => (
                                <FormItem className='col-span-12 lg:col-span-6'>
                                    <FormControl className='m-0 p-0'>
                                        <Input 
                                            className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                                            disabled={isLoading}
                                            placeholder='Write a prompt'
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className='col-span-12 lg:col-span-2 mt-1' disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='space-y-4 mt-4'>
                {isLoading && (
                    <div className='p-20 '>
                        <Loader />
                    </div>
                )}
                {!images && !isLoading ? (
                    <div>
                        <Empty label='No images generated.'/>
                    </div>
                ) : (prompt ? <img src={`https://image.pollinations.ai/prompt/${prompt}`} alt="Image description" /> 
                  : (!images && !isLoading &&
                    <div>
                        <Empty label='No images generated.'/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ConversationPage