import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MenuItemForm } from '@/components/ui/form/menu-item-form';
import { MenuForm } from '@/components/ui/form/menu-form';
import { MenuTable } from '@/components/ui/menu-table/menu-table';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';

export default function Page() {
    return (
        <>
            <div className="w-full flex items-center flex-col gap-4">
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" className="h-8 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add menu</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add new product</DialogTitle>
                                <DialogDescription>Add your product here. Click submit when you're done.</DialogDescription>
                            </DialogHeader>
                            <MenuForm></MenuForm>
                        </DialogContent>
                    </Dialog>
                </div>
                <MenuTable></MenuTable>
            </div>
        </>
    );
}
