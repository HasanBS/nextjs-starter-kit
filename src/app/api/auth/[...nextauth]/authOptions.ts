import { User } from '@/models/User';
import bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
    callbacks: {
        async session({ session, user, token }: { session: any, user: any, token: any }) {
            session.user.id = user?.id || token?.sub;
            return session;
        },
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.name = user.name || undefined;
                token.picture = user.picture || undefined;
                token.id = user.id || token.sub;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            id: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;
                mongoose.connect(process.env.MONGODB_URI ?? '');

                const user = await User.findOne({ email });
                const passwordOk = user && bcrypt.compareSync(password ?? '', user.password);

                if (passwordOk) {
                    return user;
                }
                return null;
            },
        }),
    ],
};
