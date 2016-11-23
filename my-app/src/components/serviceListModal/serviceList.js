import React from 'react';


var ServiceList = React.createClass({

    render: function(){

        var createItem = function(item, index) {
            return (
                <li key={ index}>
                    { item.name }
                </li>
            );
        };
        return <ul>{ this.props.items.map(createItem) }</ul>;
    }
});

export default ServiceList
