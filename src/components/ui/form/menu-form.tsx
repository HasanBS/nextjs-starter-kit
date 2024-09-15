"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "@nextui-org/input";

export function MenuForm() {
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
        const categoryCreatePromise = fetch('/api/menu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        }).then(async (res) => {
            if (res.ok) {
            } else {
                throw new Error('Menu item could not be created');
            }
        });

        await toast.promise(categoryCreatePromise, {
            loading: 'Oluşturuluyor...',
            success: 'Menü öğesi oluşturuldu',
            error: 'Menü öğesi oluşturulamadı',
        });
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
            </form>
        </Form>
    );
}