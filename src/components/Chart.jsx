import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin)

const Chart = ({arr=[], currency, days, coin_name}) => {
  
    const prices = []
    const date = []

    for(let i=0; i < arr.length; i++){
        if(days === "24h"){
            date.push(new Date(arr[i][0]).toLocaleTimeString())
        }
        else{
            date.push(new Date(arr[i][0]).toLocaleDateString())
        }
        prices.push(arr[i][1]);
    }

    const data = {
        labels: date,
        datasets:[{
            label: `Price in ${currency}`,
            data: prices, 
            borderColor: "rgba(0, 0, 0, 0.5)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            pointRadius: 2.6
        }]
    }

    const options = {
        responsive: true,
        scales: {
            x: {
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              }
            },
            y: {
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              }
            }
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true, 
              },
              mode: 'x',
            },
            pan: {
              enabled: true, 
              mode: 'x', 
            },
          },
          title:{
            font:{size: 50, weight:'bolder '},
            display: true,
            text:`${coin_name}`}
        },
        
      };
      

    return (
        <Line
            options={options}
            data = {data}
        />
    )
}
export default Chart