"use client";
import React, { useState, FormEvent } from 'react';
import Link from "next/link";
import GoogleSignIn from '../../components/ui/authentication/GoogleSignIn';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev: FormEvent) {
        ev.preventDefault();
        setCreatingUser(true);
        setUserCreated(false);
        setError(false);
        try {
            await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }).then(async (res) => {
                if (res.ok) {
                    setUserCreated(true);
                    console.log('User registered');
                } else {
                    setError(true);
                    console.error('Failed to register user');
                }
                setCreatingUser(false);
            }
            );
        } catch (error) {
            setError(true);
        }
    }
    return (
        <section className="mt-8">
            <h1 className="mb-4 text-primary text-center text-4xl" >Sign Up</h1>
            {
                userCreated &&
                <div className="text-green-500 text-center my-4">
                    User created
                    <br />
                    You can log in now{' '}
                    <Link className=' underline' href={'/login'}>Login &raquo;</Link>
                </div>
            }
            {
                error &&
                <div className="text-red-500 text-center my-4">
                    An error occurred!
                </div>
            }
            <form className="block mx-auto max-w-xs" onSubmit={handleFormSubmit}>
                <input className='block w-full mb-2 rounded-xl min-w-28 border p-2 border-gray-300 bg-gray-100' type="email" placeholder="Email" disabled={creatingUser} value={email} onChange={ev => setEmail(ev.target.value)} />
                <input className='block w-full mb-2 rounded-xl min-w-28 border p-2 border-gray-300 bg-gray-100' type="password" placeholder="Password" disabled={creatingUser} value={password} onChange={ev => setPassword(ev.target.value)} />
                <button className='justify-center gap-2 flex w-full text-gray-700 font-semibold my-4 border rounded-xl px-6 py-2 border-gray-300' type="submit" disabled={creatingUser}>Sign Up</button>
                <div className="my-4 text-gray-500 text-center">or</div>
                <GoogleSignIn />
                <div className='my-4 text-center text-gray-500 border-t pt-4'>
                    Already have an account?{' '}
                    <Link className=' underline' href={'/login'}>Log in &raquo;</Link>
                </div>
            </form>
        </section>
    );
}