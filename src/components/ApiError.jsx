import React from 'react'
import { Alert, AlertIcon, Center, Image } from '@chakra-ui/react'
import down_img from '../assets/server-down.png'

const ApiError = ({message}) => {
  return (
    <>
    <Alert 
    status='error'
    justifyContent={'center'}>
      <AlertIcon />
    {message}
    </Alert>

      <Center mt={['50%', '13%']} mb={['50%', '13%']} justifyContent={'center'} alignItems={'center'}> 
        <Image src={down_img} boxSize={['25%','15%']}></Image> 
      </Center>
      
    </>
  )
}

export default ApiError