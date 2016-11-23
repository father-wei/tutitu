import React from 'react';


var List = React.createClass({

    render: function(){

        var createItem = function(item, index) {
            return (
                <li key={ index}>
                    id: { item.code } name: { item.name }
                </li>
            );
        };
        return <ul>{ this.props.items.map(createItem) }</ul>;
    }
});

export default List
