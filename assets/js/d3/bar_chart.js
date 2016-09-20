function bar_chart(selector,data,selected,average,xKey,yKey,color,stroke,xAxisLabelLeft,xAxisLabelRight) {  

  var $el = d3.select(selector);
  var margin = {top: 80, right: 0, bottom: 80, left: 0};
  var width = $(selector).width() - margin.left - margin.right;
  var height = $(selector).height() - margin.top - margin.bottom;
  var yticks = 3;

  var leftArrow = "M10 4q0.414 0 0.707 0.293t0.293 0.707q0 0.422-0.297 0.711l-5.289 5.289h15.586q0.414 0 0.707 0.293t0.293 0.707-0.293 0.707-0.707 0.293h-15.586l5.289 5.289q0.297 0.289 0.297 0.711 0 0.414-0.293 0.707t-0.707 0.293q-0.422 0-0.711-0.289l-7-7q-0.289-0.305-0.289-0.711t0.289-0.711l7-7q0.297-0.289 0.711-0.289z";
  var rightArrow = "M14 4q0.422 0 0.711 0.289l7 7q0.289 0.289 0.289 0.711t-0.289 0.711l-7 7q-0.289 0.289-0.711 0.289-0.43 0-0.715-0.285t-0.285-0.715q0-0.422 0.289-0.711l5.297-5.289h-15.586q-0.414 0-0.707-0.293t-0.293-0.707 0.293-0.707 0.707-0.293h15.586l-5.297-5.289q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285z";

  var x,y,xAxis,yAxis;

  function render() {
    //x axis range
    //rangeRoundBands will be array of range and space between two bars
    x = d3.scale.ordinal()
        .rangeRoundBands([0, width],2/data.length);

    //y axis range
    y = d3.scale.linear()
        .range([height, 0]);

    //x axis
    xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    //y axis
    yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(yticks)
        .tickFormat(function(d) {
          if(d === 0) {
            return "";
          }
          return d;
        });
  }

  //append svg in page
  var svg = $el.append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + (margin.top) + ")");

  //append background    
  var rectHeight = height/yticks;
  for(var h = 0; h < yticks; h++) {
    if(h % 2 === 0) {
      svg.append("rect")
        .attr("class","rect-back")
        .attr("height",rectHeight)
        .attr("transform","translate(0," + (height - (rectHeight * (h + 1)) + 1) + ")");
    }
  }

  //append x Axis in svg
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")");

  //append y Axis in svg
  svg.append("g")
      .attr("class", "y axis");

  //append footer 
  svg.select('.x.axis').append("rect")
      .attr("class","footer")
      .attr("height",margin.bottom)
      .attr("transform","translate(0,1)");

  var arrowLeft = 10;
  var arrowTop = 50;
  var xLabelLeft = 30;
  var xLabelTop = 18;

  //append left arrow
  svg.select('.x.axis').append("path")
      .attr("class","arrow left")
      .attr("d",leftArrow);

  //append right arrow
  svg.select('.x.axis').append("path")
      .attr("class","arrow right")
      .attr("d",rightArrow);

  //append left label
  svg.select('.x.axis').append("text")
      .attr("class","x-label left")
      .style("text-anchor", "start")
      .text(xAxisLabelLeft);

  //append right label
  svg.select('.x.axis').append("text")
      .attr("class","x-label right")
      .style("text-anchor", "end")
      .text(xAxisLabelRight);

  function replay(data) {
    render();
    draw(data);
  }

  function draw(data) {
    var barPadding = (width / (4 * data.length));
    //update domain for x axis
    x.domain(data.map(function(d) { return d[xKey]; }));
    //update domain for y axis
    y.domain([0, d3.max(data, function(d) { return d[yKey]; })]);

    svg.select('.x.axis .arrow.left').attr("transform","translate(" + arrowLeft +"," + arrowTop + ")");
    svg.select('.x.axis .arrow.right').attr("transform","translate(" + (width - 20 - arrowLeft) + "," + arrowTop + ")");
    svg.select('.x.axis .x-label.left').attr("transform","translate(" + (arrowLeft + xLabelLeft) + "," + (xLabelTop + arrowTop) + ")");
    svg.select('.x.axis .x-label.right').attr("transform","translate(" + (width - arrowLeft - xLabelLeft) + "," + (xLabelTop + arrowTop) + ")");
    svg.select('.x.axis .footer').attr("width",width);
    svg.selectAll('.rect-back').attr("width",width);
      
    //update x axis with lables
    var xTicks = svg.select('.x.axis').transition().duration(100).call(xAxis);

    xTicks.selectAll(".tick text")
      .attr("transform","translate(-5,15)");

    xTicks.selectAll(".tick")
      .attr("class",function(d) {
        if(selected === d) {
          d3.selectAll(".diamond").remove();
          d3.select(this).append("rect")
            .attr("class","diamond")
            .attr("transform","rotate(45) translate(0,8)")
            .attr("height", 10)
            .attr("width", 10);
        }
        return "tick";
      });

    //update y axis
    var yTicks = svg.select(".y.axis").transition().duration(100).call(yAxis);
    svg.select(".y.axis").attr("transform","translate(" + width+ ",0)");

    yTicks.selectAll(".tick text")
      .attr("transform","translate(0,15)");

    var bars = svg.selectAll(".bar")
        .data(data,function(d) { return d[xKey]; });

    //remove previous bars with trnasition
    bars.exit()
      .transition()
      .duration(300)
      .attr("y", y(0))
      .attr("height", height - y(0))
      .style('fill-opacity', 1e-6)
      .remove();

    //add bars in graph
    bars.enter().append("rect")
      .attr("class",function(d) {
        var cssClass = "bar";
        if(selected === d[xKey]) {
          cssClass += " selected";
        }
        return cssClass;
      })
      .attr("y", y(0))
      .attr("height", height - y(0))
      .attr("width", x.rangeBand() - barPadding)
      .style("fill", color)
      .style("stroke",stroke)
      .style("stroke-width","2px")
      .style("pointer-events", "all");
     
    //transition bars
    bars.transition().duration(1000).attr("x", function(d) { 
        if(d[xKey] === selected) {
          svg.selectAll(".selected-background").remove();
          svg.append("rect")
            .attr("class","selected-background")
            .attr("x",x(d[xKey]) - barPadding)
            .attr("y",-1 * margin.top)
            .attr("height", height + margin.top + 1)
            .style("opacity",0)
            .attr("width", x.rangeBand() + barPadding)
            .transition().duration(2000).style("opacity",0.5);
        }

        if(d[xKey] > average) {
          svg.selectAll(".bar-average").remove();
          svg.append("rect")
            .attr("class","bar-average")
            .attr("x",x(d[xKey]) - (x.rangeBand()) - (barPadding/2) + (x.rangeBand() * (average - d[xKey])))
            .attr("y",-1 * margin.top)
            .attr("height", height + margin.top + 1)
            .attr("width",1);
        }

        return x(d[xKey]); 
      }) // (d) is one item from the data array, x is the scale object from above
      .attr("width", x.rangeBand() - barPadding) // constant, so no callback function(d) here
      .attr("y", function(d) { return y(d[yKey]); })
      .attr("height", function(d) { return height - y(d[yKey]); }); // flip the height, because y's domain is bottom up, but SVG renders top down
  }

  replay(data);

  window.addEventListener('resize', function() {

    width = $(selector).width() - margin.left - margin.right;
    height = $(selector).height() - margin.top - margin.bottom;

    replay(data);
  });
  
}