import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../components/ui/authentication/AppContext';
import { Toaster } from 'react-hot-toast';

import SideBar from '@/components/ui/layout/side-bar';
import { Header } from '@/components/ui/layout/header';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
    title: 'Next.JS Starter Kit',
    description: 'Next.JS Starter Kit with Tailwind CSS and TypeScript. It includes authentication, API routes, and more.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.className} min-h-screen flex flex-col`}>
                <AppProvider>
                    <Toaster />
                    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
						<SideBar/>
                        <div className="flex flex-col">
                            <Header/>
                            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
                        </div>
                    </div>
                </AppProvider>
            </body>
        </html>
    );
}
