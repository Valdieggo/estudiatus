import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../utils/db";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";



export const authOptions = {

    // Configure one or more authentication providers
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
               
                return user;

            },
        }),
    ],
    secret: process.env.SECRET,
    session: {
        jwt: true,
    },
    callbacks: {
        async session(session ) {
            console.log(session);
            return session;
        }

    },

  
    

  };

export default (req, res) => NextAuth(req, res, authOptions);
