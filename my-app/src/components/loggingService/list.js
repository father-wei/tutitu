import React from 'react';
import { loggingServices } from '../../core/domain/loggingServices'


var List = React.createClass({

    getInitialState: function() {
        return {
            sum : 0

        }
    },
    componentWillMount: function() {
        var _this = this;
        this.getTotal();
        loggingServices.on("value", function(){
            _this.getTotal();
        });
    },



    getTotal : function(){
        var sum = this.props.items
            .map(item => item.price)
        .reduce(function(a, b) {
            return a + b
        }, 0);

        this.setState({sum: sum});
    },

    createItem : function(item, index) {

        return (

            <tr key={ index} className="active">

                <td>{ item.memberId }</td>
                <td>{ item.serviceId }</td>
                <td>{ item.serviceName }</td>
                <td>{ item.providerId }</td>
                <td>{ item.date }</td>
                <td> $ { item.price }</td>
            </tr>


            );
    },

    render: function(){



        return <table className="table table-striped table-hover ">
            <thead>
                <tr>
                    <th>Member   ID (CODE)</th>
                    <th>Service  ID (CODE)</th>
                    <th>Service  Name     </th>
                    <th>Provider ID (CODE)</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Total: $ {this.state.sum ? this.state.sum : this.props.sum }</th>
                </tr>
            </thead>
            <tbody>
                   { this.props.items.map(this.createItem) }
            </tbody>
        </table>
    }
});

export default List
