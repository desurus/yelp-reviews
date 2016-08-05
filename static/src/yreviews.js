var BusinessList = React.createClass({
    render: function(){
        return (
            <div className="business-list">
                <h1 id="title">changing title to something new!</h1>
            </div>
        );
    }
});

ReactDOM.render(
    <BusinessList />,
    document.getElementById('content')
);

