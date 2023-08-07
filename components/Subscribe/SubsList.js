import { Divider, Text } from "@chakra-ui/react";
import MenuItem from "../Layout/MenuItem";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";

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
        <Divider />
        {
            navSize === 'large' &&
            <Text fontSize="lg" fontWeight="bold" color="post.300">
              {careerSubs.length > 1 ? "Tus Carreras" : "Tu Carrera"}
            </Text>
        }
        {careerSubs.map((career) => (
            <MenuItem title={career.careerName} link={`/career/${career._id}`} navSize={navSize} />
        ))}
        <Divider />
        {
            navSize === 'large' &&
            <Text fontSize="lg" fontWeight="bold" color="post.300">
              {subjectSubs.length > 1 ? "Tus Asignaturas" : "Tu Asignatura"}
            </Text>
        }
        
        {subjectSubs.map((subject) => (
            <MenuItem title={subject.subjectName} link={`/subject/${subject._id}`} navSize={navSize} />
        ))}
        <Divider />
      </>
    );
  }
}
