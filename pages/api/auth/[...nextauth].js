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
               
                return   user ;

            },
        }),
    ],
    secret: process.env.SECRET,
    session: {
        jwt: true,
        //1min  
        maxAge: 60,
    },
    callbacks: {
        async jwt({ token,user }) {
            console.log("jwt");
            console.log("user",user);
           console.log("token",token);
           console.log("jwt");
           // add info user to token
           if(user){
            token.name = user.username;
            token.role= user.role;
            token.id = user._id;
           }

            return token;
          },


      async session({session, token}) {
        console.log("session");
        console.log("session",session);
        console.log("token",token);
        console.log("session");
        // add info user to session
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.id = token.id;
        return session
       
      }
    },
    

  };

export default (req, res) => NextAuth(req, res, authOptions);
