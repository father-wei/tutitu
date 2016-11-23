import React from 'react';
import { services } from '../../core/domain/services'
import List from './list'

var ServiceList = React.createClass({
    getInitialState: function() {
        return {
            services: []
        }
    },

    componentWillMount: function() {
        services.on('value', function(dataSnapshot) {
            var services = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                services.push(item);
            }.bind(this));

            this.setState({
                services: services
            });
        }.bind(this));
    },

    componentWillUnmount: function() {
        services.off();
    },

    render: function() {

        return (
            <div>
                <h2>SERVICES</h2>
                <List items={ this.state.services }  component="service"/>
            </div>
         )

    }
});

export default ServiceList