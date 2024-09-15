import { HStack, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'

const Header = () => {
  return (
    <HStack spacing={'4'} width={'105'} height={'105'} p={"4"} shadow={"base"} bgColor={"blackAlpha.900"} justifyContent={'center'}>

      <Button fontSize={'xl'} variant={"unstyled"} color={"white"} css={{'&:hover':{color:'#FFD700'}}}>
        <Link to='/'> Home </Link>
      </Button>

      <Button fontSize={'xl'} variant={"unstyled"} color={"white"} css={{'&:hover':{color:'#FFD700'}}}>
        <Link to='/exchanges'> Exchanges </Link>
      </Button>

      <Button fontSize={'xl'} variant={"unstyled"} color={"white"} css={{'&:hover':{color:'#FFD700'}}}>
        <Link to='/coins'> Coins </Link>
      </Button>

    </HStack>
  )
}

export default Header