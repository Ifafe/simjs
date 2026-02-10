import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const authOptions = {
      adapter: PrismaAdapter(prisma),
      providers: [
            GoogleProvider({
                  clientId: process.env.GOOGLE_CLIENT_ID || "",
                  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            }),
            LinkedInProvider({
                  clientId: process.env.LINKEDIN_CLIENT_ID || "",
                  clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
            }),
            AzureADProvider({
                  clientId: process.env.AZURE_AD_CLIENT_ID || "",
                  clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
                  tenantId: process.env.AZURE_AD_TENANT_ID,
            }),
            CredentialsProvider({
                  name: "Credentials",
                  credentials: {
                        email: { label: "Email", type: "email" },
                        password: { label: "Password", type: "password" }
                  },
                  async authorize(credentials) {
                        if (!credentials?.email || !credentials?.password) return null;

                        const user = await prisma.user.findUnique({
                              where: { email: credentials.email }
                        });

                        if (!user || !user.password) return null;

                        // Check password (plaintext for now as seeded)
                        const isValid = credentials.password === user.password;

                        if (!isValid) return null;

                        return user;
                  }
            }),
      ],
      session: {
            strategy: "jwt" as const,
      },
      callbacks: {
            async session({ session, token, user }: any) {
                  console.log("Session Callback - Token:", token); // DEBUG
                  if (session.user) {
                        session.user.id = token.sub as string;
                        session.user.role = token.role as string;
                        session.user.image = token.picture as string | null | undefined;
                  }
                  console.log("Session Callback - Session:", session); // DEBUG
                  return session;
            },
            async jwt({ token, user, account, profile }: any) {
                  if (user) {
                        console.log("JWT Callback - User Login:", user); // DEBUG
                        token.id = user.id;
                        token.role = user.role || "VISITOR";
                  }
                  console.log("JWT Callback - Token:", token); // DEBUG
                  return token;
            },
      },
      pages: {
            signIn: "/login",
            error: "/login",
      },
      debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
