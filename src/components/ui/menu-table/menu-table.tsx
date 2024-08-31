'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table';
import { Tooltip } from '@nextui-org/tooltip';
import { Edit, Trash } from 'lucide-react';
import Link from 'next/link';

type Column = {
    key: string;
    label: string;
};

const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'actions', label: 'Actions' },
];

export function MenuTable() {
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
                            <span className="text-lg cursor-pointer active:opacity-50">
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
        <Table>
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn key={column.key} className={column.key === 'actions' ? 'w-24 right-0 ' : ''}>{column.label}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {rows.map((row: any) => (
                    <TableRow key={row._id}>{(columnKey) => <TableCell>{renderCell(row, columnKey)}</TableCell>}</TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
