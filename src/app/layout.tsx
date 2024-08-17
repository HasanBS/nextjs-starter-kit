import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../components/ui/authentication/AppContext';
import { Toaster } from 'react-hot-toast';

import { Header } from '@/components/ui/layout/header';
import { useRouter } from 'next/router';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
    title: 'Next.JS Starter Kit',
    description: 'Next.JS Starter Kit with Tailwind CSS and TypeScript. It includes authentication, API routes, and more.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>)
{
    return (
        <html lang="en">
            <body className={`${roboto.className} min-h-screen flex flex-col`}>
                <AppProvider>
                    <Toaster />
                    {children}
                </AppProvider>
            </body>
        </html>
    );
}


