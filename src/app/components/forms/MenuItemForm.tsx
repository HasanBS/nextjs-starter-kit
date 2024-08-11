'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormMoneyInput from '@/components/ui/form-money-input';
import { useState } from 'react';

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string(),
    price: z.number().positive(),
    thumbnail: z.string(),
});

export function MenuItemForm() {
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            thumbnail: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // const formData = new FormData();
        // formData.append('name', values.name);
        // formData.append('description', values.description);
        // formData.append('price', values.price);
        // if (thumbnailFile) {
        //     formData.append('thumbnail', thumbnailFile);
        // }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name of your product" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Description of your product" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormMoneyInput label="Price" placeholder="Price of your product" name="price" form={form} />
                <FormField
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Thumbnail</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    placeholder="Description of your product"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            setThumbnailFile(e.target.files[0]);
                                            field.onChange(e.target.files[0].name);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
