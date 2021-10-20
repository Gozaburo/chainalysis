const request = require('request');
const https = require('https');
const coinbase = {
    buyBTC: 'https://api.coinbase.com/v2/prices/BTC-USD/buy',
    buyETH: 'https://api.coinbase.com/v2/prices/ETH-USD/buy',
    sellBTC: 'https://api.coinbase.com/v2/prices/BTC-USD/sell',
    sellETH: 'https://api.coinbase.com/v2/prices/ETH-USD/sell'
};

const kraken = {
    btcData: 'https://api.kraken.com/0/public/Ticker?pair=BTCUSD',
    ethData: 'https://api.kraken.com/0/public/Ticker?pair=ETHUSD'
};

const endpointLinks = new Map();
endpointLinks.set("BUYBTCCOINBASE", 'https://api.coinbase.com/v2/prices/BTC-USD/buy');
endpointLinks.set("BUYETHCOINBASE", 'https://api.coinbase.com/v2/prices/ETH-USD/buy');
endpointLinks.set("BUYBTCKRAKEN", 'https://api.kraken.com/0/public/Ticker?pair=BTCUSD');
endpointLinks.set("BUYETHKRAKEN", 'https://api.kraken.com/0/public/Ticker?pair=ETHUSD');
endpointLinks.set("SELLBTCCOINBASE", 'https://api.coinbase.com/v2/prices/BTC-USD/sell');
endpointLinks.set("SELLETHCOINBASE", 'https://api.coinbase.com/v2/prices/ETH-USD/sell');
endpointLinks.set("SELLBTCKRAKEN", 'https://api.kraken.com/0/public/Ticker?pair=BTCUSD');
endpointLinks.set("SELLETHKRAKEN", 'https://api.kraken.com/0/public/Ticker?pair=ETHUSD');

function reqUrl(url) {
    let data = ""
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.on('data', (packet) => {
                data += packet;
            });
            res.on('end', () => {
                data = JSON.parse(data);
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}
async function getPrice(method, currency, exchange) {
    endpoint = endpointLinks.get(method + currency + exchange);
    if (!endpoint) {
        return;
    }
    const data = await reqUrl(endpoint);
    if (exchange == 'COINBASE') {
        return data.data.amount;
    }
    if (exchange == 'KRAKEN') {
        const result = data.result;
        const unpack = result[Object.keys(result)[0]];
        if (method == 'SELL') {
            return unpack.a[0];
        }
        return unpack.b[0];
    }
}

module.exports = { endpointLinks, kraken, coinbase, reqUrl, getPrice }