import React from 'react';


var List = React.createClass({

    render: function(){

        var createItem = function(item, index) {
            return (
                <tr key={ index} className="active">

                    <td>{ item.code }</td>
                    <td>{ item.name }</td>
                    <td>{ item.description}</td>
                </tr>

            );
        };
        return (<table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>Id (Code)</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.items.map(createItem) }
                    </tbody>
                </table>)
    }
});

export default List



