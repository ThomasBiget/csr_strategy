import { NextAuthOptions } from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/client';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
    },  
    providers: [
        CredentialsProvider({

          name: "Credentials",

          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const response = await prisma.user.findUnique({
              where: {
                email: credentials?.email,
              },
            });
            const user = response;
            if (!user) {
              return null;
           }
            const passwordValid = await compare(credentials?.password || '', user.password);

            if (passwordValid) {
              return {
                id: user.id.toString(),
                email: user.email,
                name: user.name,
              }
            }
            return null
          }
        })
      ],
      callbacks: {
        async session({ session, token }) {
          return {
            ...session,
            user: {
            ...session.user,
            username: token.name,
            }
          }
        },
        async jwt({ token, user}) {
          console.log('user', user)
          if (user) {
            return {
            ...token,
            username: user.name,
          }
          }
          return token
        }
      },
};



export const getAuthSession = async () => {
  const authSession = await getServerSession(authOptions);
  return authSession;
}