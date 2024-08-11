'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function () {
    const session = useSession();
    const status = session.status;
    const userData = session.data?.user;
    let userName = userData?.name || userData?.email;
    if (userName?.includes(' ')) {
        userName = userName.split(' ')[0];
    }

    return (
        <header className="flex items-center justify-between bg-gray-800">
            <nav className="flex items-center gap-8 text-gray-500 font-semibold">
            </nav>
            <nav className="flex items-center gap-4 text-gray-500 font-semibold">
                {
                    status === 'authenticated'
                    &&
                    <>
                        <Link className="whitespace-nowrap" href={'/profile'}>Hello, {userName}</Link>
                        <button className="bg-primary my-0 text-white rounded-full px-6  py-2" onClick={() => signOut()}>
                            Logout
                        </button>
                    </>
                }
                {
                    status !== 'authenticated'
                    &&
                    <>
                        <Link href={'/login'}>LogIn</Link>
                        <Link className="bg-primary text-white rounded-full px-6  py-2" href={'/register'}>Sign Up</Link>
                    </>
                }
            </nav>
        </header>
    );
}