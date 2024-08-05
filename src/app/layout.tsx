import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { AppProvider } from './components/AppContext';
import { Toaster } from "react-hot-toast";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: "Next.JS Starter Kit",
  description: "Next.JS Starter Kit with Tailwind CSS and TypeScript. It includes authentication, API routes, and more.", 
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
          <Toaster/>
          <Header/>
          <main className="flex-grow">{children}</main>
          <Footer/>
        </AppProvider>
      </body>
    </html>
  );
}
