import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../utils/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import clientPromise from "../../../lib/mongodb";

export const authOptions = {
    // Configure one or more authentication providers
    secret: 'chakalito',
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "alumno@universidad.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********",
                },
            },
            async authorize(credentials) {
                await connectToDatabase();
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("No user found");
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("Could not log you in");
                }
                console.log(user);
                return new Promise ({ email: user.email, username: user.username, birthday: user.birthday, id: user._id.toString()});
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
    },
    callbacks: {
        async jwt(token, user) {
            console.log('jwt', user);
            if (user) {
                token.id = user.id;
                token.username = user.username;
            }
            return token;
        },
        async session(session, token, user) {
            session.user.id = token.id;
            session.user.username = token.username;
            return session;
        }, 

    }

  }

export default (req, res) => NextAuth(req, res, authOptions);
