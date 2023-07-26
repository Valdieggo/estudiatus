import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../../../utils/db";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import { isBaned } from "../../../utils/isBaned";



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
                
                const isBanned = await isBaned(user._id);
                if (isBanned) {
                    throw new Error("You are banned");
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
        error: '/auth/error',
    },

  };

export default (req, res) => NextAuth(req, res, authOptions);
