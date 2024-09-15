import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import dev_img from '../assets/developer.jpg'

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} color={'whiteAlpha.900'} minH={'48'} px={'16'} py={['16', '8']}>

        <Stack direction={['column', 'row']} h={'full'} alignItems={'center'}>
            <VStack w={'full'} alignItems={['center', 'flex-start']}>
                <Text fontWeight={'bold'} css={{'&:hover':{textDecoration:'underline'}}}> <a href='https://github.com/ShayadRon' target='blank'> Github: Ronit </a> </Text>
                <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center', 'left']}> Contact Mail : ronit@xyz.com </Text>
                <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center', 'left']}> Contact Number : +91 123456789 </Text>
                
            </VStack>
            <VStack>
                <Avatar boxSize={'28'} mt={['4', '0']} src={dev_img}/>
                    <Text textAlign={'center'}>  Developer 🐶 </Text>

            </VStack>
        </Stack>
    </Box>
  )
}

export default Footer