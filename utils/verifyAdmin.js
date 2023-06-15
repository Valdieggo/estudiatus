import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";


// This function is used to verify if the user is an admin
// If the user is not an admin, it will redirect to the home page
export default function verifyAdmin() {
    const { data: session, status } = useSession();
    const rolesAdmin = ["admin","moderator"];
    
    const verify = () => {
        if (typeof window !== 'undefined') {
            if (status === "authenticated") {
                if (rolesAdmin.includes(session.user.role)) {
                    return;
                } 
            }
            window.location.href = "/"
        }
    }

    useEffect(() => {
        console.log("estado: ", status)
        if(status !== "loading"){
            verify();
        }
    }, [
        status === "loading"
    ]);
}