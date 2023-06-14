import { Link, Text } from '@chakra-ui/react'
import { useSession } from "next-auth/react"

export default function Home() {
    /*
        const { data: session, status } = useSession()
        if (!session) return (<></>)
        else if (session.role === "moderator") return (
            <>
                <Text fontSize="2xl" mt="5">
                    Admin
                </Text>
                <Link href="/administrator/subject">Subject</Link>
    
            </>
        )
    */
    return (
        <>
            <Text fontSize="2xl" mt="5">
                Admin Time
            </Text>
            <Link href="/administrator/subject">Subject</Link>
            <Link href="/administrator/college">College</Link>
            <Link href="/administrator/career">Career</Link>
        </>
    )
}