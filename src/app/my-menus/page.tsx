import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MenuItemForm } from '@/components/ui/form/menu-item-form';

export default function Page() {
    return (
        <>
            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add new product</DialogTitle>
                                <DialogDescription>Add your product here. Click submit when you're done.</DialogDescription>
                            </DialogHeader>
                            <MenuItemForm></MenuItemForm>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            
        </>
    );
}
