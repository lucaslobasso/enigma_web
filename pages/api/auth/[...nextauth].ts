import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { authorizeRequest } from "../requests";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials as any;
        
        return await authorizeRequest({
          email,
          password
        });
      }
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    updateAge: 86400, // cada día
    maxAge: 86400, /// cada día
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    newUser: "/auth/welcome"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);