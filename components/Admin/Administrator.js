import { Link, Text } from "@chakra-ui/react";
import isAdmin from "../../utils/isAdmin";

export default function Home() {
  if (!isAdmin()) {
    return <></>;
  } else {
    return (
      <>
        <Text fontSize="2xl" mt="5">
          Admin Time
        </Text>
        <Link href="/administrator/subject">Subject</Link>
        <Link href="/administrator/college">College</Link>
        <Link href="/administrator/career">Career</Link>
        <Link href="/administrator/post">Post</Link>
        <Link href="/administrator/moderation">Moderacion</Link>
        <Link href="/administrator/appeal_request">Appeal requests</Link>
        <Link href="/administrator/subject_request">Subject requests</Link>
      </>
    );
  }
}
