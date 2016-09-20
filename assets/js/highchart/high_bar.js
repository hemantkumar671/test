function high_bar() {
    var chart = new Highcharts.Chart({
        chart: {
            type: 'bar',
            renderTo: 'high_bar',
            backgroundColor: '#56226c',
            marginLeft: 0,
            marginTop: 80,
            marginRight: 0,
            marginBottom: 0
        },
        title: {
          text: null
        },
        xAxis: {
            categories: ['Slent Thrombosis', 'Death', 'Bleeding'],
            tickWidth: 0,
            lineWidth: 0,
            alternateGridColor: '#722e91',
            labels: {
              style: {
                color: '#fff',
                "font-size": '16px'
              },
            	align: 'left',
              x: 20,
          	},
        },
        yAxis: {
            min: -2.5,
            max: 7.5,
            gridLineWidth: 0,
            title: {
              text: null
            },
            tickAmount: 0,
            showFirstLabel: false,
      		showLastLabel: false,
            startOnTick: false,
        },
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Reduction',
            color: '#ba99c8',
            data: [0, -0.8, -0.9],
            pointPadding: -0.25,
            borderWidth: 0,
        }, {
            name: 'Risk',
            color: '#ffffff',
            data: [3.4,2.7,1.5],
            pointPadding: -0.25,
            borderWidth: 0,
        }, {
            name: 'Increase',
            color: '#eb1c24',
            data: [1.2,0,0],
            pointPadding: -0.25,
            borderWidth: 0,
        }]
    },
    //add function for custom renderer
    function (chart) {

      chart.renderer.rect(0, 0 , chart.chartWidth, 80,0)
            .attr({
                fill: '#742e91',
                stroke: '#742e91',
                'stroke-width': 1,
                zIndex: 4
            })
            .add();

        chart.renderer.rect(chart.chartWidth / 4 - 2, 0 , 4, chart.chartHeight,0)
            .attr({
                fill: '#ffffff',
                stroke: '#ffffff',
                'stroke-width': 1,
                zIndex: 5
            })
            .add();

        // function addData(index,arrText,arrBackGround) {
        //     var x = chart.chartWidth * 3 / 4;
        //     var width = chart.chartWidth / (4 * arrText.length);
        //     var top = index > 0 ? 80 : 0;
        //     var height = index > 0 ? (chart.chartHeight - top) / 3 : 80;
        //     var textPaddingLeft = 50;
        //     var textPaddingTop = index > 0 ? 80 : 50;

        //     if(index < 1) {
        //         index = 1;
        //     }

        //     for(var i = 0; i < arrText.length; i++) {
        //          chart.renderer.rect(x + (width * i), (index - 1) * height + top , width, height ,0)
        //             .attr({
        //                 fill: arrBackGround[i],
        //                 stroke: arrBackGround[i],
        //                 'stroke-width': 1,
        //                 zIndex: 6
        //             })
        //             .add();

        //         chart.renderer.text (arrText[i], x + (width * i) + textPaddingLeft, (index - 1) * height + textPaddingTop + top)
        //             .attr({
        //                 fill: '#ffffff',
        //                 stroke: '#ffffff',
        //                 'stroke-width': 1,
        //                 zIndex: 7,
        //                 "font-size": 30
        //             })
        //             .add();
        //     }

            
        // }    

        // var arrData = chart.series;
        // for(var i = 0; i < arrData.length; i++) {
        //     var arrText = ["Mod","Risk"],arrBackGround = ["#a396a8","#ddcbe3"];
        //     if(i === 0) {
        //         addData(i,arrText,arrBackGround);
        //     }

        //     var series = chart.series[i];
        //     arrText = [series.data[0].y,series.data[1].y],
        //     arrBackGround = ["#a396a8","#ddcbe3"];
        //     addData(i + 1,arrText,arrBackGround);
        // }

        // -------------------------------------------//
        chart.renderer.rect(chart.chartWidth * 3 / 4, 0 , chart.chartWidth / 8, 80 ,0)
            .attr({
                fill: 'rgba(86,34,108,0.5)',
                stroke: 'rgba(86,34,108,0.5)',
                'stroke-width': 1,
                zIndex: 6
            })
            .add();

        chart.renderer.text ("Mod", chart.chartWidth * 3 / 4 + 50, 50)
            .attr({
                fill: '#ffffff',
                stroke: '#ffffff',
                'stroke-width': 1,
                zIndex: 7,
                "font-size": 30
            })
            .add();

        // -------------------------------------------//
        chart.renderer.rect(chart.chartWidth * 7 / 8, 0 , chart.chartWidth / 8, 80 ,0)
            .attr({
                fill: '#ffffff',
                stroke: '#ffffff',
                'stroke-width': 1,
                zIndex: 6
            })
            .add();

        chart.renderer.text ("Risk", chart.chartWidth * 7 / 8 + 50, 50)
            .attr({
                fill: 'rgba(86,34,108)',
                stroke: 'rgba(86,34,108)',
                'stroke-width': 1,
                zIndex: 7,
                "font-size": 30
            })
            .add();

        // -------------------------------------------//
        chart.renderer.rect(chart.chartWidth * 3 / 4, 80 , chart.chartWidth / 8, (chart.chartHeight - 80) / 3 ,0)
            .attr({
                fill: 'rgba(63,24,79,0.5)',
                stroke: 'rgba(63,24,79,0.5)',
                'stroke-width': 1,
                zIndex: 6
            })
            .add();

        chart.renderer.text ("+1.2", chart.chartWidth * 3 / 4 + 50, 160)
            .attr({
                fill: '#ff0000',
                stroke: '#ff0000',
                'stroke-width': 1,
                zIndex: 7,
                "font-size": 30
            })
            .add();

        // -------------------------------------------//
        chart.renderer.rect(chart.chartWidth * 7 / 8, 80 , chart.chartWidth / 8, (chart.chartHeight - 80) / 3 ,0)
            .attr({
                fill: '#a396a8',
                stroke: '#a396a8',
                'stroke-width': 1,
                zIndex: 6
            })
            .add();

        chart.renderer.text ("3.4", chart.chartWidth * 7 / 8 + 50, 160)
            .attr({
                fill: '#373236',
                stroke: '#373236',
                'stroke-width': 1,
                zIndex: 7,
                "font-size": 30
            })
            .add();
        // -------------------------------------------//
        chart.renderer.rect(chart.chartWidth * 3 / 4, 80 + (chart.chartHeight - 80) / 3 , chart.chartWidth / 8, (chart.chartHeight - 80) / 3 ,0)
            .attr({
                fill: 'rgba(63,24,79,0.5)',
                stroke: 'rgba(63,24,79,0.5)',
                'stroke-width': 1,
                zIndex: 6
            })
            .add();

        chart.renderer.text ("-0.8", chart.chartWidth * 3 / 4 + 50, 160 + (chart.chartHeight - 80) / 3)
            .attr({
                fill: '#ffffff',
                stroke: '#ffffff',
                'stroke-width': 1,
                zIndex: 7,
                "font-size": 30
            })
            .add();

        // -------------------------------------------//
        chart.renderer.rect(chart.chartWidth * 7 / 8, 80 + (chart.chartHeight - 80) / 3, chart.chartWidth / 8, (chart.chartHeight - 80) / 3 ,0)
            .attr({
                fill: '#ddcbe3',
                stroke: '#ddcbe3',
                'stroke-width': 1,
                zIndex: 6
            })
            .add();

        chart.renderer.text ("2.7", chart.chartWidth * 7 / 8 + 50, 160 + (chart.chartHeight - 80) / 3)
            .attr({
                fill: '#373236',
                stroke: '#373236',
                'stroke-width': 1,
                zIndex: 7,
                "font-size": 30
            })
            .add();
        // -------------------------------------------//
        chart.renderer.rect(chart.chartWidth * 3 / 4, 80 + (chart.chartHeight - 80) * 2 / 3 , chart.chartWidth / 8, (chart.chartHeight - 80) / 3 ,0)
            .attr({
                fill: 'rgba(63,24,79,0.5)',
                stroke: 'rgba(63,24,79,0.5)',
                'stroke-width': 1,
                zIndex: 6
            })
            .add();

        chart.renderer.text ("-0.9", chart.chartWidth * 3 / 4 + 50, 160 + (chart.chartHeight - 80) * 2 / 3)
            .attr({
                fill: '#ffffff',
                stroke: '#ffffff',
                'stroke-width': 1,
                zIndex: 7,
                "font-size": 30
            })
            .add();

        // -------------------------------------------//
        chart.renderer.rect(chart.chartWidth * 7 / 8, 80 + (chart.chartHeight - 80) * 2 / 3 , chart.chartWidth / 8, (chart.chartHeight - 80) / 3,0)
            .attr({
                fill: '#a396a8',
                stroke: '#a396a8',
                'stroke-width': 1,
                zIndex: 6
            })
            .add();

        chart.renderer.text ("1.5", chart.chartWidth * 7 / 8 + 50, 160 + (chart.chartHeight - 80) * 2 / 3)
            .attr({
                fill: '#373236',
                stroke: '#373236',
                'stroke-width': 1,
                zIndex: 7,
                "font-size": 30
            })
            .add();

      // var points = this.series[0].data;
      // var isStartPoint = false;
      // var isEndPoint = false;

      // for(var i = 0; i < points.length; i++) {
      //   var obj = points[i];
      //   if(obj.category > 1.5) {
      //     isStartPoint = true;
      //   }

      //   if(isStartPoint && obj.category > 1.5) {
      //     chart.renderer.rect(obj.barX + 10 - ((obj.plotX - obj.barX + 10) / 2), 0 , 1, chart.chartHeight - 80,0)
      //       .attr({
      //           fill: '#ba94c7',
      //           stroke: '#ba94c7',
      //           'stroke-width': 1,
      //           zIndex: 4
      //       })
      //       .add();
      //     break;
      //   }
      // }
    })
};


