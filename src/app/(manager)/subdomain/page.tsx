'use client';
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { SubDomainForm } from "@/components/ui/form/subdomain-form";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function SubDomain() {

    const [subDomains, setSubDomains] = useState<any[]>([]);

    useEffect(() => {
        fetchSubDomains();
    }
        , []);

    async function createSubDomain() {
        await fetch('/api/subdomain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-tenant-id': '123'
            },
            body: JSON.stringify({ name: 'subdomain' })
        }).then(async (res) => {
            if (res.ok) {
                fetchSubDomains();
            } else {
                console.log('Subdomain could not be created');
            }
        });
    }

    async function fetchSubDomains() {
        await fetch('/api/subdomain', {
            method: 'GET',
        }).then(async (res) => {
            if (res.ok) {
                return res.json().then(data => {
                    setSubDomains(data);
                });
            } else {
                console.log('Subdomains could not be fetched');
            }
        });
    }

    async function updateSubDomain() {
        await fetch('/api/subdomain', {
            method: 'PUT',
            body: JSON.stringify({ _id: '123', name: 'subdomain' })
        }).then(async (res) => {
            if (res.ok) {
                fetchSubDomains();
            } else {
                console.log('Subdomain could not be updated');
            }
        });
    }

    async function deleteSubDomain() {
        const response = await fetch('/api/subdomain', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-tenant-id': '123'
            },
            body: JSON.stringify({ _id: '123' })
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <section className='items-center'>
            {subDomains && subDomains.map((subDomain: any, index: number) => (
                <div key={index} className='text-gray-400 border-white'>
                    {subDomain.name}
                </div>
            ))}
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" className="h-8 gap-1">
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add SubDomain</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add new SubDomain</DialogTitle>
                        <DialogDescription>Add your product here. Click submit when you're done.</DialogDescription>
                    </DialogHeader>
                    <SubDomainForm></SubDomainForm>
                </DialogContent>
            </Dialog>
        </section>
    );
}