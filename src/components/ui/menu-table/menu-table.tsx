'use client';

import React, { useEffect, useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';
import { Tooltip } from '@nextui-org/tooltip';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { ModalContent, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';

type Column = {
    key: string;
    label: string;
};

const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'actions', label: 'Actions' },
];

export function MenuTable() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [rows, setRows] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('/api/menu')
                .then((response) => response.json())
                .then((data) => setRows(data))
                .catch((error) => console.error('Error fetching menu data:', error));
        };

        fetchData();
    }, []);

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
                        <Tooltip content="Delete menu">
                            <span onClick={onOpen} className="text-lg cursor-pointer active:opacity-50">
                                <Trash />
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
            <Table>
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn key={column.key} className={column.key === 'actions' ? 'w-24 right-0 ' : ''}>
                            {column.label}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody>
                    {rows.map((row: any) => (
                        <TableRow key={row._id}>{(columnKey) => <TableCell>{renderCell(row, columnKey)}</TableCell>}</TableRow>
                    ))}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor adipisicing. Mollit dolor
                                    eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
                                    nostrud ad veniam.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
