import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { server }from '../index'
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
import ApiError from './ApiError';
import Chart from './Chart';

const Coindetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [api_error, setError] = useState(false);
  const [days, setDays] = useState('24h');
  const [chartArr, setChartArr] = useState([]);
  const [currency, setCurrecny] = useState("inr"); 

  const currencySymbol = currency==="inr" ? "₹" : "$"
  const currency_str = currency==="inr" ? "inr" : "usd"

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "All Time"]

  const switchChartStatus = (i) => {
    switch(i){
      case "24h": setDays("24h"); setLoading(true); break;
      case "7d": setDays("7d"); setLoading(true); break;
      case "14d": setDays("14d"); setLoading(true); break;
      case "30d": setDays("30d"); setLoading(true); break;
      case "60d": setDays("60d"); setLoading(true); break;
      case "200d": setDays("200d"); setLoading(true); break;
      case "1y": setDays("365d"); setLoading(true); break;
      case "All Time": setDays("max"); setLoading(true); break;
      default: setDays("24h"); setLoading(true); break;
    }
  }

  useEffect(() => {
    const fetchCoin = async()=>{
      try{
        const {data} = await axios.get(`${server}/coins/${params.id}`)
        const {data:chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

        setCoin(data);
        setChartArr(chartData.prices);
        setLoading(false); 
      }
      catch(error){
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  },[params.id, currency, days])

  if(api_error) return <ApiError message={'Api error while fetching coin data.'}/>

  return (
    <Container maxW={'container.xl'}>
      {loading? <Loader/> : <>

        <Box width={'full'} borderWidth={1}>
            <Chart arr={chartArr} currency={currencySymbol} days={days} coin_name={params.id} />
        </Box>

        <HStack p={'4'} overflowX={'auto'} justifyContent={'center'}>
          {
            btns.map((i)=>(
              <Button key={i} onClick={()=>switchChartStatus(i)}> {i} </Button>
            ))
          }
        </HStack>

        <RadioGroup value={currency} onChange={setCurrecny} p={'8'} >  
          <HStack spacing={'4'} justifyContent={'center'}>
            <Radio value={'inr'}> <Text fontStyle={'bold'} fontSize={'xl'}> ₹ INR </Text> </Radio>
            <Radio value={'usd'}> <Text fontStyle={'bold'} fontSize={'xl'}> $ USD </Text> </Radio>
          </HStack> 
        </RadioGroup>
        
        <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
          
          <Text 
          fontSize={'small'} alignSelf='center' opacity={'0.7'}> 
          Last Updated {Date(coin.market_data.last_updated).split('GMT')[0]} </Text>
          
          <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'cotain'} />

          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>{currencySymbol}{coin.market_data.current_price[currency_str]} </StatNumber>
            <StatHelpText>
              <StatArrow type={coin.market_data.price_change_24h > 0 ? 'increase' : 'decrease'} />
              {coin.market_data.price_change_24h.toFixed(2)}%
            </StatHelpText>
          </Stat>

          <CustomBar high={`${currency_str} ${coin.market_data.high_24h[currency_str]}`} 
          low={`${currency_str} ${coin.market_data.low_24h[currency_str]}`} />

          <Box w={'full'} p={'4'}>
            <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
            <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}> Market Cap Rank </Text>
            <Badge fontSize={'xl'} bgColor={'blackAlpha.800'} color={'white'}> {`#${coin.market_cap_rank}`}</Badge>
            </HStack>

            <Item title={'Max Supply'} value={coin.market_data.max_supply}></Item>
            <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply}></Item>
            <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency_str]}`}></Item>
            <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency_str]}`}></Item>
            <Item title={'All Time High'} value={`${currencySymbol}${coin.market_data.ath[currency_str]}`}></Item>

          </Box>

        </VStack>

        </>
      }

    </Container>
  )
}

const Item = ({title, value}) => (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}> {title} </Text>
    <Text> {value} </Text>
  </HStack>
)

const calcProgress = (high, low) => {
  let range = high - low
  return low / range
}

const CustomBar = ({high, low}) => (
  <VStack>
    <Progress value={calcProgress(high.split(' ')[1], low.split(' ')[1])} 
    colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'sm'}> 24hr Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)


export default Coindetails