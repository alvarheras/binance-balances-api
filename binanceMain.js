const binance           = require('node-binance-api');
const helperCalcuator   = require('./helperCalcuator');


var tradesRes;

module.exports = {
  init: function () { // function (apikey,apisecret)
    binance.options({
	  APIKEY: '',
	  APISECRET: '',
	  useServerTime: true // If you get timestamp errors, synchronize to server time at startup
	});
  },
  getTradesByPair: function (pair) {
  	return new Promise((resolve, reject) => {
	    binance.useServerTime(function() {
	    	binance.trades(pair, (error, trades, symbol) => {
			  if ( error ) return reject(err);
			   tradesRes = helperCalcuator.calculateProfits(trades);
			   return resolve(tradesRes)
			});
	    });
	});
  }, // balance // 
  getBalanceAccount: function (pair) {
  	return new Promise((resolve, reject) => {
	    binance.useServerTime(function() {
	    	binance.balance(pair, (error, balance) => {
			  	if ( error ) return reject(err);
			   	return resolve(balance)
			});
	    });
	});
  }
  /*{ BTC: { available: '0.77206464', onOrder: '0.00177975' },
  LTC: { available: '0.00000000', onOrder: '0.00000000' },
  ETH: { available: '1.14109900', onOrder: '0.00000000' },
  BNC: { available: '0.00000000', onOrder: '0.00000000' },
  ICO: { available: '0.00000000', onOrder: '0.00000000' },
  NEO: { available: '0.00000000', onOrder: '0.00000000' },
  BNB: { available: '41.33761879', onOrder: '0.00000000' }*/
};
