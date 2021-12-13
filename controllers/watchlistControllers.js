'use strict';

const Watchlist = require('../models/watchlist');

const axios = require('axios');

const dataTokens = require('../config/apitokens');


/* For Get Watchlist Page , Show My Watchlists */
const watchlistPage = (req, res) => {

    Watchlist.find().exec().then(docs => {
   
        for (var i = 0; i < docs.length; i++) {
            
            (function () {
                const d = docs[i];
                var url = `https://${dataTokens.base}.iexapis.com/stable/stock/${d.symbol}/quote?token=${dataTokens.tokens}`;
                axios.get(url)
                    .then((response) => {
                 
                      
                    //     console.log(response.data.latestPrice);
            
                        Watchlist.findOneAndUpdate({_id: d._id}, {$set: {price: response.data.latestPrice}}, {upsert: true}, function (err, doc) {

                            if (err) {
                                console.log("err: " + err);
                            }else {
                               // console.log(doc);
                              
                            }

                        });
                    })
                    .catch((e) => {
                        console.log("err in /watchlist: " + e.message);
                    });
            })();
        }
        //   console.log("--- docs: ---------------", docs);
        //res.status(200).json(docs);
          res.render('watchlist',{
              docs : docs,
          });

    }).catch(e => {
        // console.log(e);
        res.status(500).json({
            error: e
        });
    });
}

/* Delete Item in Watchlist , Work with watchlistRemove.js */
const deleteItem = (req, res) => {
    const query = {_id: req.params.id};
    Watchlist.remove(query, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Deleted Succesfuly !');
        }
    });

}



const stockPagePost = (req,res, next) => {
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
    watchlistPage,
    deleteItem,
    stockPagePost
}
