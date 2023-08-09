import { Divider, Text, Link } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import SidebarItem from "../Layout/SidebarItem";

export default function SubsList({navSize}) {
  const { data: session, status } = useSession();
  
  const [careerSubs, setCareerSubs] = useState([]);
  const [subjectSubs, setSubjectSubs] = useState([]);

    useEffect(() => {
        if (session) {
            axios.get(`/api/subs/${session.user.id}`)
                .then((res) => {
                    setCareerSubs(res.data.data.careers);
                    setSubjectSubs(res.data.data.subjects);
                })
                .catch((error) => {
                    console.error("Error fetching subscriptions:", error);
                });
        }
    }, [session]);

  
    if (!session || status === "unauthenticated") {
    return <></>;
  } else {
    return (
      <>
        <Divider my="2" />
        <Text mx="8" my="4" fontWeight="bold" fontSize="xs" letterSpacing="wide" textTransform="uppercase" color="gray.400">Subs</Text>
        {
          careerSubs.map((career) => (
            <SidebarItem key={career.id} icon={null} link={`/career/${career._id}`}>
              {career.careerName}
            </SidebarItem>
          ))
        }
        {
          subjectSubs.map((subject) => (
            <SidebarItem key={subject.id} icon={null} link={`/subject/${subject._id}`}>
              {subject.subjectName}
            </SidebarItem>
          ))
        }
      </>
    );
  }
}
