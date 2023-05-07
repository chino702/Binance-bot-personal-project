const Binance = require('node-binance-us-api');

const binance = new Binance().options({
  APIKEY: '<your-api-key>',
  APISECRET: '<your-api-secret>',
  useServerTime: true,
  test: true // Set to false to trade with real money
});

const symbol = 'BTCUSD'; // replace with the symbol you want to trade

// Define your trading strategy here
function strategy(candlesticks) {
  const lastCandlestick = candlesticks[candlesticks.length - 1];
  const previousCandlestick = candlesticks[candlesticks.length - 2];
  const currentPrice = parseFloat(lastCandlestick.close);
  const previousPrice = parseFloat(previousCandlestick.close);

  if (currentPrice > previousPrice) {
    return 'BUY';
  } else if (currentPrice < previousPrice) {
    return 'SELL';
  } else {
    return 'HOLD';
  }
}

// Main trading function
async function trade() {
  const candlesticks = await binance.candlesticks(symbol, '1m');
  const action = strategy(candlesticks);

  if (action === 'BUY') {
    const quantity = 0.001; // replace with the quantity you want to trade
    const order = await binance.marketBuy(symbol, quantity);
    console.log(order);
  } else if (action === 'SELL') {
    const quantity = 0.001; // replace with the quantity you want to trade
    const order = await binance.marketSell(symbol, quantity);
    console.log(order);
  } else {
    console.log('HOLDING');
  }
}

// Call the trade function every minute
setInterval(trade, 60000);

fetch('http://localhost:3000/products')
  .then(response => response.json())
  .then(data => {
    // Do something with the data
  });
