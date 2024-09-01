import { User } from '@/models/User';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { AuthOptions } from 'next-auth';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from 'next-auth/adapters';
import client from "@/lib/mongoConnect";

export const authOptions: AuthOptions = {
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, user, token }: { session: any, user: any, token: any }) {
            session.user.id = user?.id || token?.sub;
            session.user.name = user?.name;
            session.user.image = user?.image;
            if (token.exp && token.exp * 1000 < Date.now()) {
                return null;
            }
            return session;
        },
        async jwt({ token, user }): Promise<any> {
            if (user) {
                token.name = user.name || undefined;
                token.image = user.image || undefined;
                token.id = user.id || token.sub;
            }
            if (token.exp && token.exp as number * 1000 < Date.now()) {
                return null;
            }
            return token;
        },
    },
    adapter: MongoDBAdapter(client) as Adapter,
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
                await mongoose.connect(process.env.MONGODB_URI ?? '');
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
