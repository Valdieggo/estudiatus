import SidebarItem from "../Layout/SidebarItem";
import isAdmin from "../../utils/isAdmin";
import { Divider, Text } from "@chakra-ui/react";
const list = [
    {
        name: "Asignaturas",
        link: "/administrator/subject",
    },
    {
        name: "Moderación",
        link: "/administrator/moderation",
    },
    {
        name: "Appeal requests",
        link: "/administrator/appeal_request",
    },
    {
        name: "Solicitudes de Asignatura",
        link: "/administrator/subject_request",
    },
];

export default function AdministratorList() {
    if (!isAdmin()) {
        return <></>;
    } else {
        return (
            <>
                <Divider my="2" />
                <Text
                    mx="8"
                    my="4"
                    fontWeight="bold"
                    fontSize="xs"
                    letterSpacing="wide"
                    textTransform="uppercase"
                    color="gray.400"
                >
                    Admin
                </Text>
                {list.map((item) => (
                    <SidebarItem key={item.name} link={item.link}>
                        {item.name}
                    </SidebarItem>
                ))}
            </>
        );
    }
}
