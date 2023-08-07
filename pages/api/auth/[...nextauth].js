import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../utils/db";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import { isBaned } from "../../../utils/isBaned";
import {BanError} from "../../auth/error.js";



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
                    throw new Error("NO_USER_FOUND");
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    throw new Error("LOGIN_FAILED");
                }

                const res = await isBaned(user._id);
                if (res.isBanned) {
                    throw new Error(`BANNED/${res._id}`);

                }

                return   user ;

            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        jwt: true,
        //1min  
        maxAge: 6000,
    },
    callbacks: {
        async jwt({ token,user }) {
            // add info user to token
            if(user){
                token.username = user.username;
                token.role= user.role;
                token.id = user._id;
            }

            return token;
          },


      async session({session, token}) {
        // add info user to session
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.id = token.id;
        return session
       
      }
    },
    pages: {
        signIn: "/login",
        error: "/auth/error",
       
    },

  };

export default (req, res) => NextAuth(req, res, authOptions);
