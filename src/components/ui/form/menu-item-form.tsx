'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormMoneyInput from '@/components/ui/form-money-input';



export function MenuItemForm({submit , form}: {submit: (values: any) => void , form: any}) {

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
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
