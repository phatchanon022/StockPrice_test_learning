'use strict';


const request = require('request');

const Watchlist = require('../models/watchlist');

/* For Get my Api Token Data */
const dataTokens = require('../config/apitokens');

const { default: axios } = require('axios');
const { response } = require('express');





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

/* For get symbol Post Company Data from user */
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


/* For get symbol Post CashFlow Data from user */
function getPostDataCashFlow(CashFlowPost, symbol) {
    const urlCFPost = `https://sandbox.iexapis.com/stable/stock/${symbol}/cash-flow?token=Tpk_0c655141f4634e04a5afc6f0f17d9903`;
     request(`${urlCFPost}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
          //  console.log(data);
            CashFlowPost(data);
     
        }
    });
}


/* For get symbol Post Balance Sheet Data from user */
function getPostDataBS(BalanceSheetPost, symbol) {
    const urlBSPost = `https://sandbox.iexapis.com/stable/stock/${symbol}/balance-sheet?token=Tpk_0c655141f4634e04a5afc6f0f17d9903`;
     request(`${urlBSPost}`,{json:true},(err,res,data) => {
        if (err) {
            console.log(err);
        }
        if (res.statusCode === 200) {
            //console.log(data);
            BalanceSheetPost(data);
     
        }
    });
}


/* For StockPage */
const stockPage = (req,res) => {
    res.render('stock');
}


/* For Post StockPage When User Search Stock */
const stockPagePost = (req,res, next) => {
    getPostDataQuote(function(stockQuote){
        getPostDataCompany(function(stockCom){
            getPostDataCashFlow(function(getCashFlow){
                getPostDataBS(function(getBalanceSheet){
                    res.render('stock',{
                        stQ: stockQuote,
                        stpCom: stockCom, 
                        stpCashFlow: getCashFlow,
                        stpBalanceSheet: getBalanceSheet,
                    });

                },req.body.symbol);
            },req.body.symbol);             
        },req.body.symbol);
    },req.body.symbol);
    next();

};



/* Process Add to Watchlist */
const addlist = (req, res) => {
    const watchlist = new Watchlist();
    watchlist.symbol = req.body.btnSymbol;
    watchlist.price = req.body.btnPrice;
    watchlist.marketCap = req.body.btnmarketCap;
    watchlist.change = req.body.btnChange;
    watchlist.peRatio = req.body.btnPE;
    watchlist.save((err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Success save !!");
            res.redirect('watchlist');
        }

    });
}


module.exports = {
    stockPage,
    stockPagePost,
    addlist
 
    
}

