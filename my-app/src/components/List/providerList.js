import React from 'react';
import { users } from '../../core/domain/users'

var List = React.createClass({

    createItem: function(item, index) {
        return (
            <tr key={ index} className="active">

                <td>{ item.name }</td>
                <td>{ item.username }</td>
                <td>{ item.email }</td>
                <td>{ item.address }</td>
            </tr>
            );
    },

    render: function(){

        return (<table className="table table-striped table-hover ">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Id (Code)</th>
                    <th>Email </th>
                    <th>Address </th>
                </tr>
            </thead>
            <tbody>
                   { this.props.items.map(this.createItem) }
            </tbody>
        </table>)
    }
});






var ProviderList = React.createClass({
    getInitialState: function() {
        return {
            providers: []
        }
    },

    componentWillMount: function() {
        users.on('value', function(dataSnapshot) {
            var providers = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                if(item.role === "provider"){
                    item['.key'] = childSnapshot.key;
                    providers.push(item);
                }

            })

            this.setState({
                providers: providers
            });
        }.bind(this));
    },

    componentWillUnmount: function() {
        users.off();
    },

    render: function() {

        return (
            <div>
                <h2>Providers</h2>
                <List items={ this.state.providers }/>
            </div>
            )
    }
});


export default ProviderList





