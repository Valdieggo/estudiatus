import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
    HStack,
    Heading,
    Button,
} from '@chakra-ui/react'
import { Text, Link } from '@chakra-ui/react'
import LoginForm  from './LoginForm'
import { useRouter } from 'next/router'

export default function LoginModal({ isOpen, onClose, onOpen }) {
    const router = useRouter()
    const callbackUrl = router.asPath

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="post.100">
                <ModalHeader mt="6" color="white" textAlign="center">
                    Necesitas iniciar sesion para continuar
                </ModalHeader>
                <ModalCloseButton color="white"/>
                <ModalBody>
                    <HStack mb="6" spacing="1" justify="center">
                        <Text color="white">No tienes una cuenta?</Text>
                        <Link href='/register' color="button.100">
                            Registrate
                        </Link>
                    </HStack>
                    <LoginForm callbackUrl={callbackUrl} />
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}



