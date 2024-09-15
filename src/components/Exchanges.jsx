import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack, VStack, Image, Text, Heading } from '@chakra-ui/react';
import Loader from './Loader';
import ApiError from './ApiError';

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [api_error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async()=>{
      try{
        const {data} = await axios.get(`${server}/exchanges?per_page=50`)
        setExchanges(data);
        setLoading(false); //Fetching done -> Loading false.
      }
      catch(error){
        setError(true);
        setLoading(false);
      }

    };
    fetchExchanges();
  }, [])
  
  if(api_error) return <ApiError message={'Api error trying to fetch exchanges.'}/>

  return (
    <Container maxW={'container.xl'}>

      {loading ? <Loader /> : <>
        
        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>{
            exchanges.map((obj) => (
            <Card 
              key = {obj.id}
              ex_name={obj.name}
              url={obj.url}
              img={obj.image}
              rank={obj.trust_score_rank}
            />
          ))}
        </HStack>
      </>}

    </Container>
  )
}

const Card = ({key, ex_name, url, img, rank}) => (
  <a href={url} target={"blank"}>
    <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all ease 0.2s'}
            m={'4'} css={{'&:hover':{transform:'scale(1.1)'}}}>

      <Image
        src={img} 
        w={'10'} 
        h={'10'} 
        objectFit={'contain'}
        alt={'exchange name'}
      />

      <Heading size={'md'} noOfLines={1}> {rank} </Heading>

      <Text noOfLines={'1'}> {ex_name} </Text>

    </VStack>

  </a>
);


export default Exchanges