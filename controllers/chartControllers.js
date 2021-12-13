'use strict';


const request = require('request');

/* For Get my Api Token Data */
const dataTokens = require('../config/apitokens');

/* For get symbol Post Quote Data from user */
function getPostDataQuote(QuotePost, symbol) {
    const urlQuotePost = `https://${dataTokens.base}.iexapis.com/stable/stock/${symbol}/quote?token=${dataTokens.tokens}`;
     request(`${urlQuotePost}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
         //   console.log(data);
            QuotePost(data);
     
        }
    });
}

/* For get symbol Post Chart Data from user and Use Ajax. */
function getPostDataChart(ChartPost, symbol) {
    var dataclose = [];
    const urlChartPost = `https://${dataTokens.base}.iexapis.com/stable/stock/${symbol}/chart/1m?token=${dataTokens.tokens}`;
     request(`${urlChartPost}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
            data.forEach((value, key)=>{
                dataclose.push(value.close);
                
            });
            
            //console.log(dataclose);
            ChartPost(dataclose);
     
        }

    });
}


/* For get Chart Page */
const chart = async (req, res, next) => {
    res.render('chart',{
        symbolwatch: req.query.symbol,
    });

}



/* For Get Post input Search From User */
const chartPagePost = async (req,res) => {
    getPostDataQuote(function(Quote){
        getPostDataChart(function(chartData){
            res.render('chart',{
                stQ: Quote,
                chartData: chartData,
            });

        },req.body.symbol);
        
    },req.body.symbol);
}



module.exports = {
    chart,
    chartPagePost,
 
}