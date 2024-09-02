
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { Icons } from "../../../components/ui/icons";
import { useState } from "react";

export default function GoogleSignIn({ callbackUrl = '/' }: { callbackUrl?: string }) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    async function handleGoogleSignIn(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);
        await toast.promise(
            signIn('google', { callbackUrl: callbackUrl }),
            {
                loading: 'Signing in with Google...',
                success: 'Successfully signed in with Google',
                error: 'Failed to sign in with Google'
            }
        ).then(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        });

    }
    return (
        <Button variant="outline" onClick={handleGoogleSignIn} type="button" disabled={isLoading}>
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.google className="mr-2 h-4 w-4" />
            )}{" "}
            Google
        </Button>
    );
}