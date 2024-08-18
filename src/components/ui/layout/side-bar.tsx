'use client';

import Link from 'next/link';
import { Bell, Home, Package, Package2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/my-menus', label: 'Menus', icon: Package },
];

export default function SideBar() {
    const pathName = usePathname();

    const activeClasses = 'text-primary bg-muted';
    const inactiveClasses = 'text-muted-foreground';

    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Package2 className="h-6 w-6" />
                        <span className="">Acme Inc</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    {links.map(({ href, label, icon: Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                                    pathName === href ? activeClasses : inactiveClasses
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="mt-auto p-4">
                    <Card x-chunk="dashboard-02-chunk-0">
                        <CardHeader className="p-2 pt-0 md:p-4">
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                            <Button size="sm" className="w-full">
                                Upgrade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
