import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {server} from '../index'
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react';
import Loader from './Loader';
import ApiError from './ApiError';
import CoinCard from './CoinCard';

const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [api_error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrecny] = useState("inr"); 

  const currencySymbol = currency==="inr" ? "₹" : "$"

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  }
  const buttons_numbers = new Array(10).fill(1);

  useEffect(() => {
    const fetchCoins = async()=>{
      try{
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data);
        console.log(data);
        setLoading(false); 
      }
      catch(error){
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page])
  
  if(api_error) return <ApiError message={'Api error trying to fetch coins.'}/>

  return (
    <Container maxW={'container.xl'}>

      {loading ? <Loader /> : <>
        
        <RadioGroup value={currency} onChange={setCurrecny} p={'8'}>  
          <HStack spacing={'4'}>
            <Radio value={'inr'}> ₹ INR</Radio>
            <Radio value={'usd'}> $ USD</Radio>
          </HStack>
        </RadioGroup>

        <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
            {coins.map((obj) => (
            <CoinCard 
              id={obj.id}
              key={obj.id}
              coin_name={obj.name}
              img={obj.image}
              coin_symbol={obj.symbol}
              price={obj.current_price}
              currencySymbol={currencySymbol}
            />
          ))}
        </HStack>

        <HStack justifyContent={'center'} width={'full'} overflowX={'auto'} p={'8'}>
          {
            buttons_numbers.map((item, index)=>(
              <Button 
                key={index}
                bgColor={'blackAlpha.900'} 
                color={'white'} 
                onClick={()=>changePage(index+1)}>
                {index+1}
              </Button>
            ))
          }
        </HStack>

      </>}

    </Container>
  )
}

export default Coins