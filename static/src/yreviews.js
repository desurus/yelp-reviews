var BusinessList = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }, 
    render: function(){
        var businessNodes = this.state.data.map(function(business){
            return (
                <Business icon_url={business.icon_url} name={business.name} id={business.id} url={business.url} /> 
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
    render: function(){
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

ReactDOM.render(
    <BusinessList url="/api/v1.0/businesses/" />,
    document.getElementById('content')
);

