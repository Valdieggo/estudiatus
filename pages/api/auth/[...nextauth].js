import NextAuth from "next-auth";

import { connectToDatabase } from "../../../utils/db";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";

export default  async function auth(req, res) {
    await connectToDatabase();

    return NextAuth(req, res, {
        session: {
            jwt: true,
        },
        providers: [
            Providers.Credentials({
                name: "Credentials",
                credentials: {
                    username: {
                        label: "Username",
                        type: "text",
                    },
                    birthday: {
                        label: "Birthday",
                        type: "date",
                    },
                    email: {
                        label: "Email",
                        type: "email",
                        placeholder: "alumno@universidad.com",
                    },
                    password: {
                        label: "Password",
                        type: "password",
                    },
                },
                async authorize(credentials) {
                    const user = await User.findOne({ email: credentials.email });

                    if (!user) {
                        throw new Error("No user found");
                    }

                    const isValid = await verifyPassword(credentials.password, user.password);

                    if (!isValid) {
                        throw new Error("Could not log you in");
                    }

                    return { email: user.email, username: user.username, id: user._id };
                },
            }),
        ],
        adapter: MongoDBAdapter({
            db: process.env.MONGODB_URI,
            clientPromise: connectToDatabase(),
        }),
        pages: {
            signIn: "/auth/signin",
            signOut: "/auth/signout",
            error: "/auth/error",
        },
        callbacks: {
            async jwt(token, user) {
                if (user) {
                    token.id = user._id;
                    token.username = user.username;
                }
                return token;
            },
            async session(session, token) {
                session.user.id = token.id;
                session.user.username = token.username;
                return session;
            }
        }
    });
}
