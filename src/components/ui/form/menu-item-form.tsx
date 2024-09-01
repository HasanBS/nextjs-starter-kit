'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormMoneyInput from '@/components/ui/form-money-input';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IMenuItem } from '@/models/interfaces/IMenuItem';

export function MenuItemForm() {
    const [editedMenuItem, setEditedMenuItem] = useState<(IMenuItem) | null>(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const MAX_FILE_COUNT = 1;

    const formSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        description: z.string(),
        price: z.number().positive(),
        thumbnail: z
            .any()
            .refine((files) => files && files.length, 'File is required')
            .refine((files) => files && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), 'Only image files are allowed')
            .refine((files) => files && files[0]?.size <= MAX_FILE_SIZE, 'File size should be less than 5MB')
            .refine((files) => files && files.length <= MAX_FILE_COUNT, 'Only one file is allowed'),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            thumbnail: undefined,
        },
    });

    async function handleMenuItemSubmit(values: z.infer<typeof formSchema>) {
        const data: IMenuItem = {
            name: values.name,
            description: values.description,
            price: values.price,
            thumbnail: '',
        };

        if (editedMenuItem) {
            data._id = editedMenuItem._id;
        }

        const categoryCreatePromise = fetch('/api/menu-item', {
            method: editedMenuItem ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            if (res.ok) {
            } else {
                throw new Error('Menu item could not be created');
            }
        });

        await toast.promise(categoryCreatePromise, {
            loading: editedMenuItem ? 'Güncelleniyor...' : 'Oluşturuluyor...',
            success: editedMenuItem ? 'Menü öğesi güncellendi' : 'Menü öğesi oluşturuldu',
            error: 'Menü öğesi oluşturulamadı',
        });

        setEditedMenuItem(null);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleMenuItemSubmit)} className="space-y-8">
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
                <div className="flex justify-end">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
}
