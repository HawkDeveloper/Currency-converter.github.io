import React from 'react';
import { Block2 } from './Block2';
import '../index.css';
function Header() {
  const[fromCuurrency,setFromCurrency] = React.useState('UAH');
  const[toCuurrency,setToCurrency] = React.useState('EUR');
  const[fromPrice,setFromPrice] = React.useState(0);
  const[toPrice,setToPrice] = React.useState(1);

  const[fromCuurrency2,setFromCurrency2] = React.useState('UAH');
  const[toCuurrency2,setToCurrency2] = React.useState('USD');
  const[fromPrice2,setFromPrice2] = React.useState(0);
  const[toPrice2,setToPrice2] = React.useState(1);

  const ratesRef = React.useRef({})

  React.useEffect(()=>{
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res)=> res.json())
    .then((json)=>{
      ratesRef.current = json.rates;
      onChangeToPrice(1);
      onChangeToPrice2(1);

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
 
  const onChangeFromPrice2 = (value) =>{
    const price = value / ratesRef.current[fromCuurrency2];
    const result = price * ratesRef.current[toCuurrency2];
    setToPrice2(result.toFixed(3))
    setFromPrice2(value)
  }


  const onChangeToPrice = (value) =>{
    const result = (ratesRef.current[fromCuurrency] / ratesRef.current[toCuurrency]) * value;
    setFromPrice(result.toFixed(3));
    setToPrice(value)

  }

  const onChangeToPrice2 = (value) =>{
    const result = (ratesRef.current[fromCuurrency2] / ratesRef.current[toCuurrency2]) * value;
    setFromPrice2(result.toFixed(3));
    setToPrice2(value)

  }
  React.useEffect(()=>{
    onChangeFromPrice2(fromPrice2)
  },[fromCuurrency2])

  React.useEffect(()=>{
    onChangeToPrice2(toPrice2)
  },[toCuurrency2])

  React.useEffect(()=>{
    onChangeFromPrice(fromPrice)
  },[fromCuurrency])

  React.useEffect(()=>{
    onChangeToPrice(toPrice)
  },[toCuurrency])

  return (

    <div className="header">
      <div className="header__logo"><b>H<span>a</span>wk<span>w</span>eb</b></div>
      <div className="header__exchange">
      <Block2 
      value={fromPrice} 
      currency={fromCuurrency} 
      currency1 = {'EUR'}
      />
      <Block2 value={fromPrice2} 
      currency={fromCuurrency2} 
      currency1 = {'USD'}   
      /> 
      </div>
    </div>  
  );
}

export default Header;