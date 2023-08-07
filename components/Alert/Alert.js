import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'




export function SucessAlert({ title, description }) {

    return (
        <Alert status="success" variant='left-accent'>
            <AlertIcon />
            <AlertTitle mr={2}>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

export function ErrorAlert({ title, description }) {
    return (
        <Alert status="error" variant='left-accent'>
            <AlertIcon />
            <AlertTitle mr={2}>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

export function WarningAlert({ title, description }) {
    return (
        <Alert status="warning" variant='left-accent'>
            <AlertIcon />
            <AlertTitle mr={2}>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}

export function InfoAlert({ title, description }) {
    return (
        <Alert status="info" variant='left-accent'>
            <AlertIcon />
            <AlertTitle mr={2}>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    )
}
