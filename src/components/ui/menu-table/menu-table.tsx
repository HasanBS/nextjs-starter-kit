'use client';

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from '@nextui-org/table';

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
                .then(response => response.json())
                .then(data => setRows(data))
                .catch(error => console.error('Error fetching menu data:', error));
        };

        fetchData();
    }, []);
    
    return (
        <Table>
            <TableHeader>
                {columns.map((column) => (
                    <TableColumn key={column.key}>{column.label}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {rows.map((row: any) => (
                    <TableRow key={row.key}>{(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}</TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
