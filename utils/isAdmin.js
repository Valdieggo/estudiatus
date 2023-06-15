import { useSession } from "next-auth/react"

// This function is used to verify if the user is an admin
// para components/admin
export default function isAdmin() {
    const { data: session, status } = useSession();
    const rolesAdmin = ["admin","moderator"];

    if (status === "authenticated") {
        if (rolesAdmin.includes(session.user.role)) {
            return true;
        }
    }
    return false;
}