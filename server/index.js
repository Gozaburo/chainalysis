const request = require('request');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { endpointLinks, getPrice } = require('./api_requests');
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get("/api", (req, res) => {
    res.json({
        message: 'Hello from server!',
    });
});

app.get("/prices", async (req, res) => {
    res.json(priceCache);
});

app.get('/eth', async (req, res) => {

});

app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});

const methods = ['BUY', 'SELL'];
const currencies = ['BTC', 'ETH'];
const exchanges = ['COINBASE', 'KRAKEN'];
const priceCache = {
    buy: {
        btc: {
            coinbase: 0,
            kraken: 0
        },
        eth: {
            coinbase: 0,
            kraken: 0,
        },
    },
    sell: {
        btc: {
            coinbase: 0,
            kraken: 0,
        },
        eth: {
            coinbase: 0,
            kraken: 0,
        }
    }
}
methods.forEach(method => {
    currencies.forEach(currency => {
        exchanges.forEach(async exchange => {
            setInterval(async () => {
                priceCache[method.toLowerCase()][currency.toLowerCase()][exchange.toLowerCase()] = await getPrice(method, currency, exchange);
            }, 1000);
        });
    });
});