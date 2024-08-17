import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { Button } from "../../../components/ui/button";
import { Icons } from "../../../components/ui/icons";
import { useState } from "react";

export default function GitHubSignIn() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    async function handleGitHubSignIn(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);
        await toast.promise(
            signIn('github', { callbackUrl: '/' }),
            {
                loading: 'Signing in with GitHub...',
                success: 'Successfully signed in with GitHub',
                error: 'Failed to sign in with GitHub'
            }
        ).then(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 3000)
        });

    }
    return (
        <Button variant="outline" onClick={handleGitHubSignIn} type="button" disabled={isLoading}>
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.gitHub className="mr-2 h-4 w-4" />
            )}{" "}
            GitHub
        </Button>
    );
}