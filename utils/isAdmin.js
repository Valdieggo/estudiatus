import { useSession } from "next-auth/react"

// This function is used to verify if the user is an admin
export default function isAdmin() {
    const { data: session, status } = useSession();
    if (status === "authenticated") {
        if (["admin","moderator"].includes(session.user.role)) {
            return true;
        }
    }
    return false;
}