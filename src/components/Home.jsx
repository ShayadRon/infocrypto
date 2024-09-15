import { Box, Image,Text } from '@chakra-ui/react'
import React from 'react'
import home_img from '../assets/homepageimg.jpg'

const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
      
      <Image src={home_img} w={'full'} h={'full'} objectFit={'contain'}/>

      <Text fontFamily={'Bebas Neue'} fontSize={'8xl'} textAlign={'center'}
          color={'#FFD700'} mt={['-170%','-27.5%']}> 
          InfoCrypto
      </Text>
      
    </Box>
  )
}

export default Home