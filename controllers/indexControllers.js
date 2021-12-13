'use strict';

const axios = require('axios');

const request = require('request');

var bodyParser = require('body-parser');


/* For Get my Api Token Data */
const dataTokens = require('../config/apitokens');





/* For Get Quoet Data */
const urlQuote = `https://${dataTokens.base}.iexapis.com/stable/stock/googl/quote?token=${dataTokens.tokens}`;

function getDataQuote(Quote) {
    request(`${urlQuote}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
            Quote(data);
        }
    });
}

/* For Get Most Active Lst */
const urlMostActive = `https://${dataTokens.base}.iexapis.com/stable/stock/market/list/mostactive?token=${dataTokens.tokens}`;

function getMostActive(mostActive) {
    request(`${urlMostActive}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
            mostActive(data);
        
        }
    });
}


/* For Get Most Gainers Lst */
const urlMostGainers = `https://${dataTokens.base}.iexapis.com/stable/stock/market/list/gainers?token=${dataTokens.tokens}`;

function getMostGainers(mostGainers) {
    request(`${urlMostGainers}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
            mostGainers(data);
               
         }
    });
}



/* For Get Most Losers Lst */
const urlMostLosers = `https://${dataTokens.base}.iexapis.com/stable/stock/market/list/losers?token=${dataTokens.tokens}`;

function getMostLosers(mostLosers) {
    request(`${urlMostLosers}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
            mostLosers(data);
               
         }
    });
}



/* For Get Chart Data List */
const urlChart = `https://${dataTokens.base}.iexapis.com/stable/stock/googl/chart/1m?token=${dataTokens.tokens}`;

const chartIndexPageData = async (req, res, next) => {
    try {
        const fetchData = await axios.get(urlChart);
        res.status(200).json(fetchData.data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}




/* For Get Post Quote Data in Index Page */
function getPostDataQuote(QuotePost, symbol) {
    const urlQuotePost = `https://${dataTokens.base}.iexapis.com/stable/stock/${symbol}/quote?token=${dataTokens.tokens}`;

    request(`${urlQuotePost}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
            console.log(data);
            QuotePost(data);
     
        }
    });
}


/* For get Symbol Post Company Data from user */
function getPostDataCompany(CompanyPost, symbol) {
    const urlCompanyPost = `https://${dataTokens.base}.iexapis.com/stable/stock/${symbol}/company?token=${dataTokens.tokens}`;
     request(`${urlCompanyPost}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
         //   console.log(data);
            CompanyPost(data);
     
        }
    });
}


/* For Get Post Chart Data in Index Page */
function getPostDataChart(Chart, symbol) {
    const urlChartPost = `https://${dataTokens.base}.iexapis.com/stable/stock/${symbol}/chart/1y?token=${dataTokens.tokens}`;

    request(`${urlChartPost}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
            
            Chart(data);
        }
    });
}

/* For Get Post Balance Sheet Data in Index Page */
function getPostDataBalanceSheet(balanceSheet, symbols){
    const urlBalanceSheet = `https://${dataTokens.base}.iexapis.com/stable/stock/${symbols}/balance-sheet?token=${dataTokens.tokens}`;
    request(`${urlBalanceSheet}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200){
       //  console.log(data);  
           balanceSheet(data);
        }
    });
 
 };

/* For Get Post Cash Flow Data in Index Page */
 function getPostDataCashFlow(cashFlow, symbols){
     const urlcashFlow = `https://${dataTokens.base}.iexapis.com/stable/stock/${symbols}/cash-flow?token=${dataTokens.tokens}`;
    request(`${urlcashFlow}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200){
       //  console.log(data);  
           cashFlow(data);
        }
    });
 
 };






/* For Index Page */
const indexPage = (req, res) => {
    getDataQuote(function(Quote){
        getMostActive(function(mostActive){
            getMostGainers(function(mostGainers){
                getMostLosers(function(mostLosers){
                    res.render('index',{
                        title : 'Index',
                        stockQuote: Quote,
                        stockMostActive: mostActive,
                        stockMostGainers: mostGainers,
                        stockMostLosers: mostLosers,
                    });
                });   
            });
        });
    });
};




/* For Post when User search Stock */
const indexPagePost = async (req,res) => {
    getPostDataQuote(function(stockQuote){
        getPostDataCompany(function(stockCom){
                    res.render('stock',{
                        stQ: stockQuote,
                        stpCom: stockCom,  
                    });
        },req.body.symbol)  
    },req.body.symbol);
};







module.exports = {
    indexPage,
    chartIndexPageData,
    indexPagePost
   
    
}