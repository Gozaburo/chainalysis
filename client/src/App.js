import logo from './logo.svg';
import './App.css';
import React from 'react';
function App() {
  const [data, setData] = React.useState(null);
  function fetchPrice() {
    fetch('/prices')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  React.useEffect(() => {
    fetchPrice();
    setInterval(fetchPrice, 5000);
  }, []);
  const coinbaseURL = 'https://www.coinbase.com/'
  const krakenURL = 'https://www.kraken.com/'

  const buyEthURL = data ? (data.buy.eth.kraken < data.buy.eth.coinbase ? krakenURL : coinbaseURL) : ''
  const buyEthName = data ? (data.buy.eth.kraken < data.buy.eth.coinbase ? 'Kraken' : 'Coinbase') : 'Loading'
  const bestBuyEth = <p>Best place to buy ETH: <a href={buyEthURL}>{buyEthName}</a></p>

  const sellEthURL = data ? (data.sell.eth.kraken > data.sell.eth.coinbase ? krakenURL : coinbaseURL) : ''
  const sellEthName = data ? (data.sell.eth.kraken > data.sell.eth.coinbase ? 'Kraken' : 'Coinbase') : 'Loading'
  const bestSellEth = <p>Best place to sell ETH: <a href={sellEthURL}>{sellEthName}</a></p>

  const buyBtcURL = data ? (data.buy.btc.kraken < data.buy.btc.coinbase ? krakenURL : coinbaseURL) : ''
  const buyBtcName = data ? (data.buy.btc.kraken < data.buy.btc.coinbase ? 'Kraken' : 'Coinbase') : 'Loading'
  const bestBuyBtc = <p>Best place to buy BTC: <a href={buyBtcURL}>{buyBtcName}</a></p>

  const sellBtcURL = data ? (data.sell.btc.kraken > data.sell.btc.coinbase ? krakenURL : coinbaseURL) : ''
  const sellBtcName = data ? (data.sell.btc.kraken > data.sell.btc.coinbase ? 'Kraken' : 'Coinbase') : ''
  const bestSellBtc = <p>Best place to sell BTC: <a href={sellBtcURL}>{sellBtcName}</a></p>
  return (
    <div className="App">
      <p>Buying BTC on Kraken: {data ? '$' + Number(data.buy.btc.kraken).toFixed(2) : 'Loading'}</p>
      <p>Buying BTC on Coinbase: {data ? '$' + Number(data.buy.btc.coinbase).toFixed(2) : 'Loading'}</p>
      <p>Selling BTC on Kraken: {data ? '$' + Number(data.sell.btc.kraken).toFixed(2) : 'Loading'}</p>
      <p>Selling BTC on Coinbase: {data ? '$' + Number(data.sell.btc.coinbase).toFixed(2) : 'Loading'}</p>
      <p>Buying ETH on Kraken: {data ? '$' + Number(data.buy.eth.kraken).toFixed(2) : 'Loading'}</p>
      <p>Buying ETH on Coinbase: {data ? '$' + Number(data.buy.eth.coinbase).toFixed(2) : 'Loading'}</p>
      <p>Selling ETH on Kraken: {data ? '$' + Number(data.sell.eth.kraken).toFixed(2) : 'Loading'}</p>
      <p>Selling ETH on Coinbase: {data ? '$' + Number(data.sell.eth.coinbase).toFixed(2) : 'Loading'}</p>
      <p></p>
      <p></p>
      {bestBuyEth}
      {bestSellEth}
      {bestBuyBtc}
      {bestSellBtc}
    </div>
  );
}

export default App;
