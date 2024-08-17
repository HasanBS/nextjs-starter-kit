// "use client";
// import React, { useState, FormEvent } from 'react';
// import Link from "next/link";
// import GoogleSignIn from '../../components/ui/authentication/GoogleSignIn';

// export default function RegisterPage() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [creatingUser, setCreatingUser] = useState(false);
//     const [userCreated, setUserCreated] = useState(false);
//     const [error, setError] = useState(false);

//     async function handleFormSubmit(ev: FormEvent) {
//         ev.preventDefault();
//         setCreatingUser(true);
//         setUserCreated(false);
//         setError(false);
//         try {
//             await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             }).then(async (res) => {
//                 if (res.ok) {
//                     setUserCreated(true);
//                     console.log('User registered');
//                 } else {
//                     setError(true);
//                     console.error('Failed to register user');
//                 }
//                 setCreatingUser(false);
//             }
//             );
//         } catch (error) {
//             setError(true);
//         }
//     }
//     return (
//         <section className="mt-8">
//             <h1 className="mb-4 text-primary text-center text-4xl" >Sign Up</h1>
//             {
//                 userCreated &&
//                 <div className="text-green-500 text-center my-4">
//                     User created
//                     <br />
//                     You can log in now{' '}
//                     <Link className=' underline' href={'/login'}>Login &raquo;</Link>
//                 </div>
//             }
//             {
//                 error &&
//                 <div className="text-red-500 text-center my-4">
//                     An error occurred!
//                 </div>
//             }
//             <form className="block mx-auto max-w-xs" onSubmit={handleFormSubmit}>
//                 <input className='block w-full mb-2 rounded-xl min-w-28 border p-2 border-gray-300 bg-gray-100' type="email" placeholder="Email" disabled={creatingUser} value={email} onChange={ev => setEmail(ev.target.value)} />
//                 <input className='block w-full mb-2 rounded-xl min-w-28 border p-2 border-gray-300 bg-gray-100' type="password" placeholder="Password" disabled={creatingUser} value={password} onChange={ev => setPassword(ev.target.value)} />
//                 <button className='justify-center gap-2 flex w-full text-gray-700 font-semibold my-4 border rounded-xl px-6 py-2 border-gray-300' type="submit" disabled={creatingUser}>Sign Up</button>
//                 <div className="my-4 text-gray-500 text-center">or</div>
//                 <GoogleSignIn />
//                 <div className='my-4 text-center text-gray-500 border-t pt-4'>
//                     Already have an account?{' '}
//                     <Link className=' underline' href={'/login'}>Log in &raquo;</Link>
//                 </div>
//             </form>
//         </section>
//     );
// }


import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserAuthForm } from "./components/user-auth-form"

export const metadata: Metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}

export default function AuthenticationPage() {
    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/authentication-light.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/authentication-dark.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>
            <div className="container relative hidden flex-auto flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/login"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Login
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Acme Inc
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This library has saved me countless hours of work and
                                helped me deliver stunning designs to my clients faster than
                                ever before.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <UserAuthForm />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
