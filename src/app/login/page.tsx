"use client";
import React, { useState, FormEvent } from 'react';
import Link from "next/link";
import { signIn } from "next-auth/react";
import GoogleSignIn from '../components/GoogleSignIn';

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingIn, setLoggingIn] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev: FormEvent) {
        ev.preventDefault();
        setLoggingIn(true);
        setLoginSuccess(false);
        setError(false);
        await signIn('credentials', { email, password, callbackUrl: '/' });
        try {

        } catch (error) {
            setError(true);
        }
    }

    return (
        <section className="mt-8">
            <h1 className="mb-4 text-primary text-center text-4xl">Login</h1>
            {
                loginSuccess &&
                <div className="text-green-500 text-center my-4">
                    You have successfully logged in!
                </div>
            }
            {
                error &&
                <div className="text-red-500 text-center my-4">
                    An error occurred!
                </div>
            }
            <form className="block mx-auto max-w-xs" onSubmit={handleFormSubmit}>
                <input className='block w-full mb-2 rounded-xl min-w-28 border p-2 border-gray-300 bg-gray-100' type="email" name="email" placeholder="Email" disabled={loggingIn} value={email} onChange={ev => setEmail(ev.target.value)} />
                <input className='block w-full mb-2 rounded-xl min-w-28 border p-2 border-gray-300 bg-gray-100' type="password" name="password" placeholder="Password" disabled={loggingIn} value={password} onChange={ev => setPassword(ev.target.value)} />
                <button className='justify-center gap-2 flex w-full text-gray-700 font-semibold my-4 border rounded-xl px-6 py-2 border-gray-300' type="submit" disabled={loggingIn}>Login</button>
                <div className="my-4 text-gray-500 text-center">or</div>
                <GoogleSignIn />
                <div className='my-4 text-center text-gray-500 border-t pt-4'>
                    Don't have an account yet?{' '}
                    <Link className=' underline' href={'/register'}>Sign up &raquo;</Link>
                </div>
            </form>
        </section>
    );
}