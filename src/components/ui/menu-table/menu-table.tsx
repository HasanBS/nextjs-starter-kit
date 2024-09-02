'use client';

import React, { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Tooltip } from '@nextui-org/tooltip';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { ModalContent, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import toast from 'react-hot-toast';

type Column = {
    key: string;
    label: string;
};

const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'actions', label: 'Actions' },
];

export function MenuTable() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [rows, setRows] = useState<any[]>([]);
    const [selectedMenu, setSelectedMenu] = useState<any | null>(null);

    useEffect(() => {
        const fetchData = () => {
            fetch('/api/menu')
                .then((response) => response.json())
                .then((data) => setRows(data))
                .catch((error) => console.error('Error fetching menu data:', error));
        };

        fetchData();
    }, []);

    const handleDeleteClick = (selectedMenu: any) => {
        setSelectedMenu(selectedMenu);
        onOpen();
    };

    const handleDelete = async (menuId: string, afterDeleteCallback: () => void ) => {
        const deletePromise = fetch(`/api/menu/${menuId}`, {
            method: 'DELETE',
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Menu item could not be deleted');
            }

            setRows((prevRows) => prevRows.filter((row) => row._id !== menuId));
            afterDeleteCallback();
        })

        await toast.promise(deletePromise, {
            loading: 'Deleting...',
            success: 'Menu item deleted',
            error: 'Menu item could not be deleted',
        });
    };

    const renderCell = React.useCallback((menu: any, columnKey: any) => {
        const cellValue = menu[columnKey];

        switch (columnKey) {
            case 'actions':
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit menu">
                            <Link href={'/menus/' + menu._id}>
                                <span className="text-lg cursor-pointer active:opacity-50">
                                    <Edit />
                                </span>
                            </Link>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete menu">
                            <span onClick={() => handleDeleteClick(menu)} className="text-danger text-lg cursor-pointer active:opacity-50">
                                <Trash2 />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table isStriped={true}>
                <TableHeader className="">
                    {columns.map((column) => (
                        <TableColumn key={column.key} className={column.key === 'actions' ? 'w-24 right-0 ' : ''}>
                            {column.label}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow className="h-16" key={row._id}>
                            {(columnKey) => <TableCell>{renderCell(row, columnKey)}</TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete {selectedMenu.name}?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="danger" onPress={() => handleDelete(selectedMenu._id, onClose)}>
                                    <div className="flex items-center justify-center gap-1">
                                        <Trash2 size={20} />
                                        <span>Delete</span>
                                    </div>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
