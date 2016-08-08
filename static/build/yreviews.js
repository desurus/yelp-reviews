var BusinessList = React.createClass({
    displayName: "BusinessList",

    getInitialState: function () {
        return { data: [] };
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        var businessNodes = this.state.data.map(function (business) {
            return React.createElement(Business, { icon_url: business.icon_url, name: business.name, id: business.id, url: business.url });
        });
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col-md-12" },
                React.createElement(
                    "h4",
                    null,
                    "Select business"
                )
            ),
            React.createElement(
                "div",
                { className: "col-md-6" },
                React.createElement(
                    "ul",
                    { className: "business-list list-group" },
                    businessNodes
                )
            )
        );
    }
});

var Business = React.createClass({
    displayName: "Business",

    render: function () {
        return React.createElement(
            "li",
            { className: "business-item list-group-item" },
            React.createElement(
                "a",
                { href: this.props.id },
                React.createElement("img", { src: this.props.icon_url, alt: this.props.name, className: "img-thumbnail" })
            ),
            React.createElement(
                "h4",
                { className: "list-group-item-heading" },
                React.createElement(
                    "a",
                    { href: this.props.id },
                    this.props.name
                )
            ),
            React.createElement(
                "a",
                { className: "btn btn-info", href: this.props.url, target: "_blank" },
                "View business on Yelp"
            ),
            React.createElement("span", { className: "clear" })
        );
    }
});

ReactDOM.render(React.createElement(BusinessList, { url: "/api/v1.0/businesses/" }), document.getElementById('content'));
//# sourceMappingURL=yreviews.js.map
