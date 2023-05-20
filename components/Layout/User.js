import { useSession } from "next-auth/react"
export default function User() {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
      return <p>Signed in as {session.token.email}</p>
    }
  
    return <a href="/api/auth/signin">Sign in</a>
}