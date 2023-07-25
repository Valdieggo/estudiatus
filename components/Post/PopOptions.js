import {Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, PopoverFooter} from "@chakra-ui/react";
import ModalCreateReport  from "../Admin/ModalCreateReport";
import { Button, Icon } from "@chakra-ui/react";
import { ChatIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {useState } from "react";

export default function PopOptions({post}) {
    const [modalCreateReport, setModalCreateReport] = useState(false);
    const [userReported, setUserReported] = useState("");
    const[idpost, setIdpost] = useState("");
    const openModalCreateReport = async () => {
        setModalCreateReport(true);
        setUserReported(post.creator);
        setIdpost(post._id);
      };
      const closeModalCreateReport = () => {
        setIdpost("");
        setUserReported("");
        setModalCreateReport(false);
      };

    return (
        <Popover>
            <PopoverTrigger >
                <Icon as = {ChevronDownIcon} w={6} h={6}  _hover={{color:"button.200"}}/>
            </PopoverTrigger>
            <PopoverContent  >
               
                <PopoverBody>
                    <Button type="button"
                        bg="button.100"
                        width="100%"
                        _hover={{
                            bg: "button.200",
                        }} leftIcon={<ChatIcon />} onClick={openModalCreateReport}>
                        Reportar
                    </Button>
                    <ModalCreateReport isOpen={modalCreateReport} onClose={closeModalCreateReport} reportedUser={userReported} postId={idpost} />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

