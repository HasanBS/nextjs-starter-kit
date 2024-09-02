'use client';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MenuItemForm } from '@/components/ui/form/menu-item-form';
import { MenuForm } from '@/components/ui/form/menu-form';
import { useEffect, MenuTable } from '@/components/ui/menu-table/menu-table';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Chip } from "@nextui-org/chip";
import toast from 'react-hot-toast';
import { IMenu } from '@/models/interfaces/IMenu';


export default function Page() {
    const [menus, setMenus] = useState([] as IMenu[]);

    const handleClose = (menuToRemove: any) => {
        deleteMenu(menuToRemove);
    };

    useEffect(() => {
        fetchMenus();
    }
        , []);

    async function deleteMenu(menu: any) {
        await fetch('/api/menu', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(menu),
        }).then(async (res) => {
            if (res.ok) {
                fetchMenus();
            } else {
                toast.error('Menu item could not be deleted');
            }
        });
    }

    async function fetchMenus() {
        await fetch('/api/menu', {
            method: 'GET',
        }).then(async (res) => {
            if (res.ok) {
                return res.json().then(data => {
                    setMenus(data);
                });
            } else {
                toast.error('Menu items could not be fetched');
            }
        }
        )
    }

    return (
        <section className='items-center'>
            {menus.map((menu, index) => (
                <Chip key={index} className=' text-gray-400 border-white' onClose={() => handleClose(menu)} variant="flat">
                    {menu.name}
                </Chip>
            ))}
            <div className="w-full items-center flex-col gap-4">
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
        </section>
    );
}
