import React from 'react';
import { services } from '../../core/domain/services'
import ServiceList from './serviceList'

var ServiceListContainer = React.createClass({
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
        var _this = this;
        return (
            <ServiceList items={ _this.state.services } />
         )

    }
});

export default ServiceListContainer