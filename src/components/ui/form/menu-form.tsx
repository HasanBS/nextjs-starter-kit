"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";
import { Button } from "../button";
import { IMenu } from "@/models/interfaces/IMenu";

export function MenuForm() {
    const [editedMenu, setEditedMenu] = useState<(IMenu) | null>(null);
    const formSchema = z.object({
        name: z.string().min(1, 'Name is required')
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        },
    });

    async function handleMenuSubmit(values: z.infer<typeof formSchema>) {
        const data: IMenu = {
            name: values.name,
            menuItems: []
        };

        if (editedMenu) {
            data._id = editedMenu._id;
        }
        const categoryCreatePromise = fetch('/api/menu', {
            method: editedMenu ? 'PUT' : 'POST',
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
            loading: editedMenu ? 'Güncelleniyor...' : 'Oluşturuluyor...',
            success: editedMenu ? 'Menü öğesi güncellendi' : 'Menü öğesi oluşturuldu',
            error: 'Menü öğesi oluşturulamadı',
        });
        setEditedMenu(null);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleMenuSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name of your menu" {...field} />
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