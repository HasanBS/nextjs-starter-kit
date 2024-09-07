import { ISubDomain } from "@/models/interfaces/ISubDomain";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "../form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import { Input } from "../input";
import { Button } from "../button";


export function SubDomainForm() {
    const [editedSubDomain, setEditedSubDomain] = useState<(ISubDomain) | null>(null);
    const formSchema = z.object({
        name: z.string().min(1, 'Name is required')
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ''
        },
    });

    async function handleSubDomainSubmit(values: z.infer<typeof formSchema>) {
        const data: ISubDomain = {
            name: values.name
        };

        if (editedSubDomain) {
            data._id = editedSubDomain._id;
        }
        const categoryCreatePromise = fetch('/api/subdomain', {
            method: editedSubDomain ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(async (res) => {
            if (res.ok) {
            } else {
                throw new Error('SubDomain item could not be created');
            }
        });

        await toast.promise(categoryCreatePromise, {
            loading: editedSubDomain ? 'Güncelleniyor...' : 'Oluşturuluyor...',
            success: editedSubDomain ? 'Menü öğesi güncellendi' : 'Menü öğesi oluşturuldu',
            error: 'Menü öğesi oluşturulamadı',
        });
        setEditedSubDomain(null);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubDomainSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name of your subDomain" {...field} />
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