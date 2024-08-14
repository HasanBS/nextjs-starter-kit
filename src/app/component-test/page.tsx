 "use client";
import { MenuItemForm } from "../../components/ui/form/MenuItemForm";
import toast from 'react-hot-toast';
import { IComponent } from "../../models/Component";
import { useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Page() {
    
const [editedMenuItem, setEditedMenuItem] = useState<IComponent & { _id: string }| null>(null);

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

async function handleMenuItemSubmit(values: typeof formSchema & { name: string; description: string; price: number; thumbnail: string }) {
        const data = {
            name: values.name,
            description: values.description,
            price: values.price,
            thumbnail: "",
        } as any;

        console.log(data);
        
        if (editedMenuItem) {
            data._id = editedMenuItem._id;
        }
        const categoryCreatePromise =
            fetch('/api/component-test', {
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
        <div className="p-10">
            <MenuItemForm form={form} submit={handleMenuItemSubmit} />
        </div>
    )
}