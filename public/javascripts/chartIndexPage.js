
// For Get Chart Index Page
$(function() {
    chartStockIndexPage();
  
  });


// Get Url From chartController Use ajax.
const chartStockIndexPage = async () => {

   var dataClose = [];
   var symbol = [];
   var date = [];
 
  
    await $.ajax({
        url: '/chartIndexPageData',
        type: 'GET',
        datatype: 'json',
        success: (response) => {
            if (response !== null) {
                symbol = response[0].symbol;
               // console.log(response);
               response.forEach(element =>{
                   dataClose.push(element.close);
                   date.push(element.date);
                   
                   
               });
             //  console.log(dataClose);
             //  console.log(date);
            }
        },
        error: (err) => {
            console.log(err);
        }
    });
    Highcharts.chart('container', {

        title: {
            text: `${symbol} Chart `
        },

        chart: {
            height: (9 / 16 * 100) + '%' // 16:9 ratio
        },
    
        subtitle: {
            text: 'Source: thesolarfoundation.com'
        },
    
        yAxis: {
            title: {
                text: 'Price'
            }
        },
    
        xAxis: {
            accessibility: {
                rangeDescription: `${date}`
            }
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },
    
        series: [{
            name: 'Chart',
            data: dataClose,
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });


}

