function high_chart(options) {

  // default options
  var defaultOptions = {
    renderTo : 'high_chart',
    data : {
      categories : [],
      values : []
    },
    avg : { 
      value : null,
      color : 'rgba(186,148,199,0.5)'
    },
    selected : {
      value : null,
      color : 'rgba(186,148,199,0.5)'
    },
    alternateGridColor : 'rgba(0,0,255,0.05)',
    footerClss : 'highcharts-footer',
    diamondClass : 'highcharts-diamond',
    xLegend : {
      left : {
        arrowClass: 'highchart-x-legend-arrow-left',
        textClass: 'highchart-x-legend-text-left',
        text: ""
      },
      right : {
        arrowClass: 'highchart-x-legend-arrow-left',
        textClass: 'highchart-x-legend-text-left',
        text: ""
      }
    }
  }

  this.options = $.extend(true, defaultOptions, options);

  this.draw = function() {
    if(this.options.data.categories.length > 0) {
      var footer, diamond, xLegendLeft, xLegendRight, marginBottom = 90;

      var plotBands = [],plotLines = [], options = this.options;

      if(options.avg && options.avg.value) {
        // get the interger value
        var val = parseInt(options.avg.value);
        // get the decimal value
        var decimal = options.avg.value - val;
        // get the index of integer value
        var index = options.data.categories.indexOf(val);
        // push to add plot lines
        plotLines.push({
          color: options.avg.color, 
          value: index + decimal,
          width: 2,
          zIndex: 2  
        });
      }

      if(options.selected && options.selected.value) {
        // get the index of integer value
        var index = options.data.categories.indexOf(options.selected.value);
        // push to add plot band
        plotBands.push({ 
          color: options.selected.color,
          from: index - 0.5,
          to: index + 0.5,
          zIndex: 2
        });
      }

      // function to be called on resize
      var onResize = function(chart) {
        // resize the footer
        footer
          .attr({
              width: chart.chartWidth
          });

        // reposition the a axis right legend
        xLegendRight
          .attr({
            transform: "translate(" + (chart.chartWidth - 40) + "," + (chart.chartHeight - 35) + ")",
          });

        // reposition the a axis left legend
        xLegendLeft
          .attr({
              transform: "translate(10," + (chart.chartHeight - 35) + ")",
          })

        // get the points
        var points = chart.series[0].data;
        var selected = options.selected.value;
        
        for(var i = 0; i < points.length; i++) {
          var obj = points[i];

          if(obj.category === selected) {
            // reposition the diamond on selected bar
            diamond.
              attr({
                transform: "translate(" + obj.plotX + "," + (chart.chartHeight - marginBottom + 5) + ")"
              })
            break;
          }
        }
      }

      var chart = new Highcharts.Chart({
        chart: {
        	renderTo: options.renderTo,
          type: 'column',
          marginBottom: marginBottom,
          events: {
            redraw: function () {
              onResize(this);
            }
          }
        },
        title: {
          text: null
        },
        xAxis: {
          plotBands: plotBands,
          plotLines: plotLines,
          categories: options.data.categories,
          tickWidth: 0,
          labels: {
            x: 0,
            y: 45,
          },
        },
        yAxis: [{
          min: 0,
          title: {
            text: null
          },
          gridLineWidth: 0,
          alternateGridColor: options.alternateGridColor,
          opposite: true,
          tickAmount: 5,
          labels: {
            align: 'left',
            x: -40,
            y: 20,
            format: '{value}'
          },
          showFirstLabel: false,
          showLastLabel: false,
        }],
        legend: {
          enabled: false
        },
        tooltip: {
            enabled: false
        },
        plotOptions: {
          column: {
            grouping: false,
            shadow: false,
            borderWidth: 0
          }
        },
        series: [{
          data: options.data.values,
          pointPadding: 0
        }]
      }, function (chart) { //add function for custom renderer
        //add footer
        footer = chart.renderer.rect(0, chart.chartHeight - marginBottom , 0, marginBottom, 0)
          .attr({
              class: options.footerClss,
              zIndex: 4
          })
          .add();

        //add diamond for selected bar
        diamond = chart.renderer.path(['M',8,16, 'L', 16, 8 , 'L', 8 , 0 , 'L' ,0 ,8, 'Z'])
          .attr({
              class: options.diamondClass,
              zIndex: 5
          })
          .add();
          
        //add x axis left legend
        xLegendLeft = chart.renderer.g().attr({
          zIndex: 6
        }).add();
        //add x axis left legend arrow
        chart.renderer.path(["M",1, "16l15" ,"15v-9h16v-12h-16v-9" , "z"])
          .attr({
            class : options.xLegend.left.arrowClass
          })
          .add(xLegendLeft);
        //add x axis left legend text
        chart.renderer.text(options.xLegend.left.text, 40, 20)
          .attr({
            class : options.xLegend.left.textClass
          })
          .add(xLegendLeft);

        //add x axis right legend
        xLegendRight = chart.renderer.g().attr({
          zIndex: 6,
          "text-anchor": "end"
        }).add();
        //add x axis right legend arrow
        chart.renderer.path(["M" , 31 , "16l-15-15v9h-16v12h16v9", "z"])
          .attr({
            class : options.xLegend.right.arrowClass
          })
          .add(xLegendRight);
        //add x axis right legend text
        chart.renderer.text(options.xLegend.right.text, -10, 20)
          .attr({
            class : options.xLegend.right.textClass
          })
          .add(xLegendRight);

        // call resize function onload to adjust custom renderer with chart
        onResize(chart);
      })
    }
  }
}

