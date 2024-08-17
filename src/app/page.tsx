'use client';
import { Header } from "@/components/ui/layout/header";
import SideBar from "@/components/ui/layout/side-bar";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const status = session.status;
  return (
    <div>
      {
        status === 'authenticated' &&
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <SideBar />
          <div className="flex flex-col">
            <Header />
            <main className="h-full p-6 lg:p-12">
              <div className="flex items-center justify-center">
                <h1 className="text-4xl font-bold mt-48">Welcome to Next Starter Kit</h1>
              </div>
            </main>
          </div>
        </div>
      }
      {
        status === 'loading' &&
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </div>
      }
      {
        status !== 'authenticated' &&
        <div>
          <div className="flex flex-col">
            <Header />
            <main className="h-full p-6 lg:p-12">
              <div className="flex items-center justify-center">
                <h1 className="text-4xl font-bold mt-48">
                  Welcome to Next Starter Kit
                </h1>
              </div>
            </main>
          </div>
        </div>
      }
    </div>
  );
}