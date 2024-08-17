'use client';
import { Header } from '@/components/ui/layout/header';

export default function Home() {
    return (
        <div className="flex flex-col">
            <Header />
            <main className="h-full p-6 lg:p-12">
                <div className="flex items-center justify-center">
                    <h1 className="text-4xl font-bold mt-48">Welcome to Next Starter Kit</h1>
                </div>
            </main>
        </div>
    );
}
