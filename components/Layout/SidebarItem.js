import { Box, Flex, Icon, Link} from "@chakra-ui/react";

export default function SidebarItem({ link, icon, children, ...rest }) {
    return (
        <Link href={link}>
            <Box
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: 'post.200',
                        color: 'white',
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            _groupHover={{
                                color: 'white',
                            }}
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Box>
        </Link>
    );
}
