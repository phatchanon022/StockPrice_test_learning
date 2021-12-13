'use strict';


/* For peRatio Page */
const peRatioPage = async (req,res) => {
    res.render('peratio',{
        symbolsPE1: req.query.symbolsPE1,
        symbolsPE2: req.query.symbolsPE2,
        symbolsPE3: req.query.symbolsPE3,
    });
}

/* For Post When User Search */
const pePagePost = (req,res, next) => {
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
    peRatioPage,
    pePagePost
    
}