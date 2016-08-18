 function drawcharts(a,b,o) {
  var rate=a;
  var price=b;
  var appendchart_to='pic'+o;
  console.log("Printing to index "+appendchart_to);
    // Uncomment to style it like Apple Watch

    if (!Highcharts.theme) {
        Highcharts.setOptions({
            chart: {
                backgroundColor: 'black'
            },
            colors: ['#83B27B', '#3A3C3F'],
            title: {
                style: {
                    color: 'white'
                }
            },
            tooltip: {
                style: {
                    color: 'white'
                }
            }
        });
    }


    Highcharts.chart(appendchart_to, {

        chart: {
            type: 'solidgauge',
            marginTop: 50,
            backgroundColor:'none'
        },

        title: {
            text: 'Review',
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: true,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.val}</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.3).get(),
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Rating',
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: rate*20,
                val:rate
            }]
        }, {
            name: 'Price-Level',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '75%',
                innerRadius: '75%',
                y: price*20,
                val:price
            }]
        }]
    });

}
