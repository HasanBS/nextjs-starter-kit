// "use client";
// import React, { useState, FormEvent } from 'react';
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import GoogleSignIn from '../../components/ui/authentication/GoogleSignIn';

// export default function LoginPage() {

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loggingIn, setLoggingIn] = useState(false);
//     const [loginSuccess, setLoginSuccess] = useState(false);
//     const [error, setError] = useState(false);

//     async function handleFormSubmit(ev: FormEvent) {
//         ev.preventDefault();
//         setLoggingIn(true);
//         setLoginSuccess(false);
//         setError(false);
//         await signIn('credentials', { email, password, callbackUrl: '/' });
//         try {

//         } catch (error) {
//             setError(true);
//         }
//     }

//     return (
//         <section className="mt-8">
//             <h1 className="mb-4 text-primary text-center text-4xl">Login</h1>
//             {
//                 loginSuccess &&
//                 <div className="text-green-500 text-center my-4">
//                     You have successfully logged in!
//                 </div>
//             }
//             {
//                 error &&
//                 <div className="text-red-500 text-center my-4">
//                     An error occurred!
//                 </div>
//             }
//             <form className="block mx-auto max-w-xs" onSubmit={handleFormSubmit}>
//                 <input className='block w-full mb-2 rounded-xl min-w-28 border p-2 border-gray-300 bg-gray-100' type="email" name="email" placeholder="Email" disabled={loggingIn} value={email} onChange={ev => setEmail(ev.target.value)} />
//                 <input className='block w-full mb-2 rounded-xl min-w-28 border p-2 border-gray-300 bg-gray-100' type="password" name="password" placeholder="Password" disabled={loggingIn} value={password} onChange={ev => setPassword(ev.target.value)} />
//                 <button className='justify-center gap-2 flex w-full text-gray-700 font-semibold my-4 border rounded-xl px-6 py-2 border-gray-300' type="submit" disabled={loggingIn}>Login</button>
//                 <div className="my-4 text-gray-500 text-center">or</div>
//                 <GoogleSignIn />
//                 <div className='my-4 text-center text-gray-500 border-t pt-4'>
//                     Don't have an account yet?{' '}
//                     <Link className=' underline' href={'/register'}>Sign up &raquo;</Link>
//                 </div>
//             </form>
//         </section>
//     );
// }

"use client"

import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserLoginAuthForm } from './components/user-login-auth-form';

export default function LoginPage() {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

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
          href="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          SingUp
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
                Login your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to log in your account
              </p>
            </div>
            <UserLoginAuthForm />
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