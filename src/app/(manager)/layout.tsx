"use client";

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import SideBar from '@/components/ui/layout/side-bar';
import { Header } from '@/components/ui/layout/header';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [theme, setTheme] = useState<'dark' | 'light'>('light');

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(mediaQuery.matches ? 'dark' : 'light');

        const handleChange = (e: MediaQueryListEvent) => {
            setTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);
    
    return (
        <div className={cn("grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]", theme)}>
            <SideBar />
            <div className="flex flex-col">
                <Header />
                <main className="h-full p-6 lg:p-12">
                    <div className="flex items-center justify-center">{children}</div>
                </main>
            </div>
        </div>
    );
}
