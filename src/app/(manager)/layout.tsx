import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import SideBar from '@/components/ui/layout/side-bar';
import { Header } from '@/components/ui/layout/header';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
    title: 'Next.JS Starter Kit',
    description: 'Next.JS Starter Kit with Tailwind CSS and TypeScript. It includes authentication, API routes, and more.',
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
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
