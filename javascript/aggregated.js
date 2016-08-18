function aggregate(input) {
// The div to which the results are added i.e the SVG of aggragated column chart results
    $('#aggregated_results').highcharts({
        chart: {
            type: 'column',
            backgroundColor:'none'
        },
        title: {
            text: 'Rating Comparisions'
        },
        subtitle: {
            text: 'Source: Google Maps API '
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -90,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    color:'white'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Rating Places',
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    color:'white'
                }
            },
            labels: {
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    color:'white'
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Rated: <b>{point.y:.1f} out of 5</b>'
        },
        series: [{
            name: 'Rating',
            data: input,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    color:'white'
                }
            }
        }]
    });


}
