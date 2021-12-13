

// peRatio Compare Use fetch , Promise.all
$(function(){
    fetch('http://localhost:3000/config/tokens.json')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var tokens = data.tokens;
        var symbolsPE1 = document.getElementById("symbolsPE1").value.toUpperCase();
        var symbolsPE2 = document.getElementById("symbolsPE2").value.toUpperCase();
        var symbolsPE3 = document.getElementById("symbolsPE3").value.toUpperCase();

        // 3 fetch requests for 3 endpints
        // and converting to JSON using the json() method
        const fetchReq1 = fetch(`https://cloud.iexapis.com/stable/stock/${symbolsPE1}/quote?token=${tokens}`)
        .then((res) => res.json());
  
         const fetchReq2 = fetch(`https://cloud.iexapis.com/stable/stock/${symbolsPE2}/quote?token=${tokens}`)
         .then((res) => res.json());
  
         const fetchReq3 = fetch(`https://cloud.iexapis.com/stable/stock/${symbolsPE3}/quote?token=${tokens}`)
         .then((res) => res.json());
  
         // do fetch requests in parallel
         // using the Promise.all() method
         const allData = Promise.all([fetchReq1, fetchReq2, fetchReq3]);
  
         // attach then() handler to the allData Promise
         allData.then((res) => {

         // Get the data to Chart   
         var symbol1 = res[0].symbol ;
         var pe1 = res[0].peRatio;
         var price1 = res[0].latestPrice;


         var symbol2 = res[1].symbol ;
         var pe2 = res[1].peRatio;
         var price2 = res[1].latestPrice;


         var symbol3 = res[2].symbol ;
         var pe3 = res[2].peRatio;
         var price3 = res[2].latestPrice;


      // console.log(symbol1);
      // console.log(symbol2);
      // console.log(symbol3);
       
         

         var charts = [],
         containers = document.querySelectorAll('#trellis td'),
         datasets = [{
            name: `${symbol1}`,
            data: [pe1, price1]
        },
        {
            name: `${symbol2}`,
            data: [pe2, price2]
        },
        {
            name: `${symbol3}`,
            data: [pe3, price3]
        }];

        datasets.forEach(function(dataset, i) {
        charts.push(Highcharts.chart(containers[i], {

        chart: {
            type: 'column',
            marginRight: i <= 2 ? 300 : 10,
            
          
            
        },

        title: {
            text: dataset.name,
            align: 'left',
            x: i === 0 ? 90 : 0
        },

        credits: {
            enabled: false
        },

        xAxis: {
            categories: ['PE Ratio', 'Price'],
            labels: {
                enabled: i <= 2
            }
        },

        yAxis: {
            allowDecimals: false,
            title: {
                text: null
            },
            min: 0,
            max: 1200
        },


        legend: {
            enabled: false
        },

        series: [dataset]

    }));
});



         });
         

        

    });

    



})