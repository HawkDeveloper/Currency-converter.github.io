import React from 'react';
import { Block } from './components/Block';
import Header from './components/Header'
import './index.css';

function App() {
  const[fromCuurrency,setFromCurrency] = React.useState('UAH');
  const[toCuurrency,setToCurrency] = React.useState('USD');
  const[fromPrice,setFromPrice] = React.useState(0);
  const[toPrice,setToPrice] = React.useState(1);


  // const [rates,setRates] = React.useState({});

  const ratesRef = React.useRef({})

  React.useEffect(()=>{
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res)=> res.json())
    .then((json)=>{
      // setRates(json.rates);
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    })
    .catch((err)=>{
      console.warn(err);
      alert('Недвалося отримати інформацію');
    });
  }, []);

  const onChangeFromPrice = (value) =>{
    const price = value / ratesRef.current[fromCuurrency];
    const result = price * ratesRef.current[toCuurrency];
    setToPrice(result.toFixed(3))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) =>{
    const result = (ratesRef.current[fromCuurrency] / ratesRef.current[toCuurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value)

  }
  
  React.useEffect(()=>{
    onChangeFromPrice(fromPrice)
  },[fromCuurrency])

  React.useEffect(()=>{
    onChangeToPrice(toPrice)
  },[toCuurrency])

  return (

    <div className="App">
      <Header/>
      <Block 
      value={fromPrice} 
      currency={fromCuurrency} 
      onChangeCurrency={setFromCurrency} 
      onChangeValue={onChangeFromPrice}
      />
      <Block value={toPrice} 
      currency={toCuurrency} 
      onChangeCurrency={setToCurrency} 
      onChangeValue={onChangeToPrice} 
      />    
     
      
    </div>


    
  );
}

export default App;