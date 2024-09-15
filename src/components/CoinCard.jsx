import { VStack, Image, Text, Heading } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const CoinCard = ({id, coin_name, img, coin_symbol, price, currencySymbol="₹"}) => (
    <Link to={`/coin/${id}`}>
        <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all ease 0.2s'}
                m={'4'} css={{'&:hover':{transform:'scale(1.1)'}}}>

        <Image
            src={img} 
            w={'10'} 
            h={'10'} 
            objectFit={'contain'}
            alt={'exchange name'}
        />

        <Heading size={'md'} noOfLines={1}> {coin_symbol} </Heading>

        <Text noOfLines={'1'}> {coin_name} </Text>
        <Text noOfLines={'1'}> {price ? `${currencySymbol}${price}` : "N/A"} </Text>


        </VStack>

    </Link>
);

export default CoinCard;
