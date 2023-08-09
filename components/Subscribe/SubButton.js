import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react'
import LoginModal from "../Auth/LoginModal.js";

export default function SubButton({ type, id}) {
    const { data: session, status } = useSession();
    const [subscribed, setSubscribed] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const idType = type+'Id';
    useEffect(() => {
        if (status === "authenticated") {
            const res = axios.post(`/api/${type}/getSubscribeUser`, {
                userId: session.user.id,
                [idType]: id
            }).then((res) => {
                setSubscribed(res.data.data);
            })
        }

    }, [status]);
    
    const subscribe = () => {
        if (status === "authenticated") {
            setIsSubscribing(true);
            const res = axios.put(`/api/${type}/subscribe`, {
                userId: session.user.id,
                [idType]: id
            }).then((res) => {
                const subscribed = res.data.data.includes(session.user.id);
                setIsSubscribing(false);
                setSubscribed(subscribed);
            })
        } else {
            onOpen();
        }
    }

    const buttonText = subscribed ? 'Suscrito' : 'Subscribete';
    
    return (
        <Button variant='solid' colorScheme='blue' onClick={subscribe}
            isDisabled={isSubscribing}
        >
            {buttonText}
            <LoginModal isOpen={isOpen} onClose={onClose} />
        </Button>
    );
}