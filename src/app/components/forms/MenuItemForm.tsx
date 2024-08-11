'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormMoneyInput from '@/components/ui/form-money-input';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const formSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string(),
    price: z.number().positive(),
    thumbnail: z
        .any()
        .refine((files) => files && files.length, 'File is required')
        .refine((files) => files && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), 'Only image files are allowed')
        .refine((files) => files && files[0]?.size <= MAX_FILE_SIZE, 'File size should be less than 5MB'),
});

export function MenuItemForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            thumbnail: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
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
                                <Input type="file" onChange={(e) => field.onChange(e.target.files)} ref={field.ref} />
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
