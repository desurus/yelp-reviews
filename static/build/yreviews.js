var BusinessList = React.createClass({
    displayName: "BusinessList",

    render: function () {
        return React.createElement(
            "div",
            { className: "business-list" },
            React.createElement(
                "h1",
                { id: "title" },
                "changing title to something new!"
            )
        );
    }
});

ReactDOM.render(React.createElement(BusinessList, null), document.getElementById('content'));
//# sourceMappingURL=yreviews.js.map
