var Businesses = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    fetchData: function(api_url) {
        $.ajax({
            url: api_url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(api_url, status, err.toString());
            }.bind(this)
        });  
    },
    componentDidMount: function() {
        this.fetchData('/api/v1.0/businesses/');
    },
    render: function() {
        var businessNodes = this.state.data.map(function(business){
            return (
                <Business icon_url={business.icon_url} name={business.name} id={"#reviews/"+business.id} url={business.url} /> 
            );
        });
        return (
            <div className="row">
                <div className="col-md-12"><h4>Select business</h4></div>
                <div className="col-md-6">
                    <ul className="business-list list-group">
                        {businessNodes} 
                    </ul>
                </div>
            </div>
        );
    }
});

var Business = React.createClass({
    render: function() {
        return (
            <li className="business-item list-group-item">
                <a href={this.props.id}><img src={this.props.icon_url} alt={this.props.name} className="img-thumbnail"/></a>
                <h4 className="list-group-item-heading"><a href={this.props.id}>{this.props.name}</a></h4>
                <a className="btn btn-info" href={this.props.url} target="_blank">View business on Yelp</a>
                <span className="clear"></span>
            </li>
        );
    }
});

var Reviews = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        drawPlot('/api/v1.0/reviews/'+this.props.location[1]+'/');
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <a href="#" className="btn btn-default" aria-label="Left Align">
                        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        back
                    </a>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <svg id="reviews-graph"></svg>
                    </div>
                </div>
            </div>    
        );
    }
});

function drawPlot(api_url) {
    var margin = {top: 10, right: 10, bottom: 100, left: 40},
        margin2 = {top: 430, right: 10, bottom: 20, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        height2 = 500 - margin2.top - margin2.bottom;
    
    
    var x = d3.time.scale().range([0, width]),
        x2 = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([height, 0]),
        y2 = d3.scale.linear().range([height2, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom"),
        xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
        yAxis = d3.svg.axis().scale(y).orient("left");

    var brush = d3.svg.brush()
        .x(x2)
        .on("brush", brushed);

    var area = d3.svg.area()
        .interpolate("monotone")
        .x(function(d) { return x(d3.time.format("%b %Y").parse(d.date)); })
        .y0(height)
        .y1(function(d) { return y(d.rating); });

    var area2 = d3.svg.area()
        .interpolate("monotone")
        .x(function(d) { return x2(d3.time.format("%b %Y").parse(d.date)); })
        .y0(height2)
        .y1(function(d) { return y2(d.rating); });

    var svg = d3.select("#reviews-graph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    d3.json(api_url, function(error, data) {
        x.domain(d3.extent(data.map(function(d) { return d3.time.format("%b %Y").parse(d.date); })));
        y.domain([0, d3.max(data.map(function(d) { return +d.rating; }))]);
        x2.domain(x.domain());
        y2.domain(y.domain());

    focus.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area);

    focus.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    focus.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    
    context.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", area2);

    context.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(xAxis2);

    context.append("g")
        .attr("class", "x brush")
        .call(brush)
        .selectAll("rect")
        .attr("y", -6)
        .attr("height", height2 + 7);
    });

    function brushed() {
        x.domain(brush.empty() ? x2.domain() : brush.extent());
        focus.select(".area").attr("d", area);
        focus.select(".x.axis").call(xAxis);
    }
};

function handleNewHash() {
    var location = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
    if (location[0] == '') {
        var application = <Businesses location={location} />;
    }
    if (location[0] == 'reviews') {
        var application = <Reviews location={location} />;
    }
    ReactDOM.render(
        application,
        document.getElementById('content')
    );
};

handleNewHash()
window.addEventListener('hashchange', handleNewHash, false);

