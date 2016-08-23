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
                <img src={this.props.icon_url} alt={this.props.name} className="img-thumbnail"/>
                <h4 className="list-group-item-heading">
                    <a href={this.props.url} target="_blank">
                        {this.props.name} on Yelp
                        &nbsp;<span className="glyphicon glyphicon-new-window" aria-hidden="true"></span>
                    </a>
                </h4>
                <a className="btn btn-info" href={this.props.id}>View reviews statistics</a>
                <span className="clear"></span>
            </li>
        );
    }
});

var Reviews = React.createClass({
    getInitialState: function() {
        return {data: []};
        // this.fetchData('/api/v1.0/businesses/'+this.props.location[1]+'/');
    },
    componentDidMount: function() {
        this.fetchData('/api/v1.0/businesses/'+this.props.location[1]+'/');
        drawPlot('/api/v1.0/reviews/'+this.props.location[1]+'/');
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
    render: function() {
        console.log(this.state.data);
        if (this.state.data[0] != null ) {
            business_name = this.state.data[0].name;
        } else {
            business_name = "";
        }
        return (   
            <div className="col-md-12">
                <a href="#" className="btn btn-default" aria-label="Left Align">
                    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    back
                </a>
                <h2>{ business_name }</h2>
                <p className="lead">
                    This bar-chart visually represents avarage rating for the given business left by the reviewrs.<br/>
                    It's compared to the calculated avarage based on the text review using NLP algorithm.
                </p>
                <svg id="reviews-graph"></svg>
                <p>
                    <span className="users-review"></span> - Average rate by the user<br/>
                    <span className="calculated-review"></span> - Average rcalculated rating
                </p>
            </div>  
        );
    }
});

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


function drawPlot(api_url) {
    var margin = {top: 10, right: 10, bottom: 100, left: 40},
        margin2 = {top: 430, right: 10, bottom: 20, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        height2 = 500 - margin2.top - margin2.bottom;

    var x = d3.time.scale().range([0, width]),
        x2 = d3.time.scale().range([0, width]);

    var y = d3.scale.linear().range([height, 0]),
        y2 = d3.scale.linear().range([height2, 0]);

    var xAxis = d3.svg.axis().scale(x).orient("bottom"),
        xAxis2 = d3.svg.axis().scale(x2).orient("bottom");

    var yAxis = d3.svg.axis().scale(y).orient("left");

    var brush = d3.svg.brush()
        .x(x2)
        .on("brush", brushed);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
        return "<h4>" + d.date + " Avarage reviews:</h4>" +
               "<p><strong>Users rating:</strong> <span style='color:red;'>" + d.rating + "</span></p>" +
               "<p><strong>Calculated rating:</strong> <span style='color:red;'>" + d.score + "</span></p>" +
               "<p><strong>Number of reviews:</strong> <span style='color:red;'>" + d.num_reviews + "</span></p>";
    })

    var svg = d3.select("#reviews-graph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    svg.call(tip);

    var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

    d3.json(api_url, function(error, data) {
        x.domain(d3.extent(data.map(function(d) { return d3.time.format("%b %Y").parse(d.date); })));
        y.domain([0, d3.max(data, function(d) { return +d.rating;; })]);

        x2.domain(x.domain());
        y2.domain(y.domain());
        
        focus.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        focus.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        bars_holder = focus.append("g")
            .attr("clip-path", "url(#clip)");

        bars = bars_holder.selectAll(".bar")
            .data(data)
            .enter();

        bars.append("rect")
            .attr("class", "bar1 bar")
            .attr("x", function(d) { return x(d3.time.format("%b %Y").parse(d.date)) - 4; })
            .attr("width", width/data.length/2)
            .attr("y", function(d) { return y(d.rating); })
            .attr("height", function(d) { return height - y(d.rating); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        bars.append("rect")
            .attr("class", "bar2 bar")
            .attr("x", function(d) { return x(d3.time.format("%b %Y").parse(d.date)); })
            .attr("width", width/data.length/2)
            .attr("y", function(d) { return y(d.score); })
            .attr("height", function(d) { return height - y(d.score); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        context.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height2 + ")")
            .call(xAxis2);
        
        bars2 = context.selectAll(".bar")
            .data(data)
            .enter();

        bars2.append("rect")
            .attr("class", "bar1")
            .attr("x", function(d) { return x2(d3.time.format("%b %Y").parse(d.date)); })
            .attr("width", width/data.length/2)
            .attr("y", function(d) { return y2(d.rating); })
            .attr("height", function(d) { return height2 - y2(d.rating); });

        bars2.append("rect")
            .attr("class", "bar2")
            .attr("x", function(d) { return x2(d3.time.format("%b %Y").parse(d.date)) - 4; })
            .attr("width", width/data.length/2)
            .attr("y", function(d) { return y2(d.score); })
            .attr("height", function(d) { return height2 - y2(d.score); });

        context.append("g")
            .attr("class", "x brush")
            .call(brush)
            .selectAll("rect")
            .attr("y", -6)
            .attr("height", height2 + 7);
    });  

    function brushed() {
        x.domain(brush.empty() ? x2.domain() : brush.extent());
        focus.selectAll(".bar1")
            .attr("x", function(d) { return x(d3.time.format("%b %Y").parse(d.date)) - 10; })
            .attr("height", function(d) { return height - y(d.rating); })
            .attr("width", function(d) { return 10; });

        focus.selectAll(".bar2")
            .attr("x", function(d) { return x(d3.time.format("%b %Y").parse(d.date)); })
            .attr("height", function(d) { return height - y(d.score); })
            .attr("width", function(d) { return 10; });

        focus.select(".x.axis").call(xAxis);
    };
};

handleNewHash();
window.addEventListener('hashchange', handleNewHash, false);

