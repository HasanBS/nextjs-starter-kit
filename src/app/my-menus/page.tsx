import Image from 'next/image';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MenuItemForm } from '@/components/ui/form/MenuItemForm';

const Menus = [
    {
        name: 'Menu 1',
        description: 'Menu 1 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 2',
        description: 'Menu 2 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 3',
        description: 'Menu 3 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 1',
        description: 'Menu 1 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 2',
        description: 'Menu 2 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 3',
        description: 'Menu 3 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 1',
        description: 'Menu 1 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 2',
        description: 'Menu 2 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
    {
        name: 'Menu 3',
        description: 'Menu 3 description',
        menuItems: [
            {
                name: 'Menu Item 1',
                description: 'Menu Item 1 description',
                price: 100,
                imageUrl: 'https://placehold.co/400',
            },
            {
                name: 'Menu Item 2',
                description: 'Menu Item 2 description',
                price: 200,
                imageUrl: 'https://placehold.co/400',
            },
        ],
    },
];

type MenuItem = {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
};

type Menu = {
    name: string;
    description: string;
    menuItems: MenuItem[];
};

type Props = {
    menus: Menu[];
};

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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Created at</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Menus.map((menu) =>
                        menu.menuItems.map((item) => {
                            return (
                                <TableRow key={item.name}>
                                    <TableCell className="hidden sm:table-cell">
                                        <Image
                                            alt={item.name}
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={item.imageUrl}
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </>
    );
}
