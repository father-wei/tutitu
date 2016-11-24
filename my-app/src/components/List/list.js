import React from 'react';


var List = React.createClass({

    createItem: function(item, index) {
        return (
            <tr key={ index} className="active">

                <td>{ item.code }</td>
                <td>{ item.name }</td>

                {this.props.component === "members"?  <td>{ item.status }</td> :  <td>{ item.description}</td>}
                {this.props.component === "service"?  <td> $ { item.price }</td> :  null}
                {localStorage.role ==="manager"? <td>  { item.providerId }</td> :  null}
            </tr>

            );
    },

    render: function(){


        return (<table className="table table-striped table-hover ">
                    <thead>
                        <tr>
                            <th>Id (Code)</th>
                            <th>Name</th>

                            { this.props.component === "members"? <th>Status</th> :  <th>Description</th>}
                            { this.props.component === "service"? <th>Price</th> :  null}
                            {localStorage.role ==="manager"? <th>Provider Id</th> :  null}
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.items.map(this.createItem) }
                    </tbody>
                </table>)
    }
});

export default List



