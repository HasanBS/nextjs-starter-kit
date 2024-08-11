
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";

export default function GoogleSignIn() {

    async function handleGoogleSignIn() {
        await toast.promise(
            signIn('google', { callbackUrl: '/' }),
            {
                loading: 'Signing in with Google...',
                success: 'Successfully signed in with Google',
                error: 'Failed to sign in with Google'
            }
        );
    }
    return (
        <button className='justify-center gap-4 flex w-full text-gray-700 font-semibold my-4 border rounded-xl px-6 py-2 border-gray-300' type='button' onClick={() => handleGoogleSignIn()}>
            <Image src="/google.png" width={24} height={24} alt="Sing in with Google" />
            Sing in with Google
        </button>
    );
}