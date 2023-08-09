import { Divider } from "@chakra-ui/react";
import MenuItem from "../Layout/MenuItem";
import isAdmin from "../../utils/isAdmin";

export default function Home({ navSize }) {
    if (!isAdmin()) {
        return <></>;
    } else {
        return (
            <>
                <Divider />
                <MenuItem
                    title="Admin. Asignaturas"
                    link={"/administrator/subject"}
                    navSize={navSize}
                />
                <MenuItem
                    title="Admin. Post"
                    link={"/administrator/post"}
                    navSize={navSize}
                />
                <MenuItem
                    title="Admin. Moderation"
                    link={"/administrator/moderation"}
                    navSize={navSize}
                />
                <MenuItem
                    title="Admin. Appeal requests"
                    link={"/administrator/appeal_request"}
                    navSize={navSize}
                />
                <MenuItem
                    title="Admin. Solicitudes de Asignatura"
                    link={"/administrator/subject_request"}
                    navSize={navSize}
                />

                <Divider />
                <MenuItem
                    title="Todas Las Universidades"
                    link={"/college"}
                    navSize={navSize}
                />
                <MenuItem
                    title="Todas Las carreras"
                    link={"/career"}
                    navSize={navSize}
                />
                <MenuItem
                    title="Todas Las Asignaturas"
                    navSize={navSize}
                    link={"/subject"}
                />
            </>
        );
    }
}
