const _ = require('lodash');


module.exports = {
  	// ** calculate profits
  	calculateProfits: function (trades) {
  		var profits;
  		var lastBuyPrice = 0;
	  	var tradesMProfit = trades.map(function(x,i) {
	  		if(x.isBuyer) lastBuyPrice = x.price;
	  		if(x.isBuyer == false) {
	  			x.profit = (((parseFloat(x.qty)*parseFloat(x.price))*100)/(parseFloat(x.qty)*parseFloat(lastBuyPrice))-100);
	  			x.lastBuyPrice = lastBuyPrice;
	  			profits += parseFloat(x.profit);
	  		}
	  		if(i == trades.length-1) {x.profitTotal = profits;} // profit total in last position of pair
	  		return x;
		});
	  	return tradesMProfit;
  	}	
};