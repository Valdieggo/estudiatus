import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function SubButton({ type, id}) {
    const { data: session, status } = useSession();
    const [subscribed, setSubscribed] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);
    const idType = type+'Id';
    useEffect(() => {
        if (session) {
            const res = axios.post(`/api/${type}/getSubscribeUser`, {
                userId: session.user.id,
                [idType]: id
            }).then((res) => {
                setSubscribed(res.data.data);
            })
        }

    }, [status]);
    
    const subscribe = () => {
        setIsSubscribing(true);
        const res = axios.put(`/api/${type}/subscribe`, {
            userId: session.user.id,
            [idType]: id
        }).then((res) => {
            const subscribed = res.data.data.includes(session.user.id);
            setIsSubscribing(false);
            setSubscribed(subscribed);
        })
    }

    const buttonText = subscribed ? 'Suscrito' : 'Subscribete';
    
    return (
        <Button variant='solid' colorScheme='blue' _hover={{bg: 'blue.500'}} onClick={subscribe}
            isDisabled={isSubscribing}
        >
            {buttonText}
        </Button>
    );
}