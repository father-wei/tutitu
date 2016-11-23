import React from 'react';


var List = React.createClass({

    render: function(){

        var createItem = function(item, index) {
            return (
                <li key={ index}>
                  Logged : {item.memberId}  {item.serviceId} {item.providerId}
                </li>
            );
        };
        return <ul>{ this.props.items.map(createItem) }</ul>;
    }
});

export default List
