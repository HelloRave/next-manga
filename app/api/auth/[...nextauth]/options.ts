import { NextAuthOptions } from "next-auth";
import GithubProviver from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export const options: NextAuthOptions = {
    // adapter: PrismaAdapter(Prisma) as Adapter,
    pages: {
        signIn: '/auth/signin',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'email', type: 'text', placeholder: 'Your email',
                },
                password: {
                    label: 'password', type: 'password', placeholder: 'Your password',
                },
            },
            async authorize(credentials, req) {
                try {
                    const foundUser = await prisma.user.findUnique({
                        where: {
                            email: credentials?.email,
                        },
                    });
                    if (foundUser) {
                        console.log('User exist');
                        const passwordMatch = await bcrypt.compare(
                            (credentials?.password as string), foundUser.password
                        );

                        if (passwordMatch) {
                            console.log('Good match');
                            return {
                                id: foundUser.id,
                                name: foundUser.name,
                                email: foundUser.email,
                                role: foundUser.role,
                            };
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
                return null
            },
        }),
        GithubProviver({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
            profile(profile) {
                console.log("Profile Github: ", profile);

                let userRole = "GitHub User"

                if(profile?.email == "vxoweiwei@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile, role: userRole,
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            profile(profile) {
                console.log("Profile Google: ", profile);

                let userRole = "Google User"

                if(profile?.email == "vxoweiwei@gmail.com") {
                    userRole = "admin";
                }

                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole,
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) token.role = user.role
            return token
        },
        async session({ session, token }: any) {
            if (session?.user) session.user.role = token.role
            return session
        }
    }
}