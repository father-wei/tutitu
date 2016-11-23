import React from 'react';
import { loggingServices } from '../../core/domain/loggingServices'
import List from './list'

var LoggingService = React.createClass({
    getInitialState: function() {
        return {
            loggingServices: [],
            serviceIdText: '',
            memberIdText: ''

        }
    },

    componentWillMount: function() {
        var items = [];
        loggingServices.orderByChild("providerId")
            .equalTo(localStorage.token)
            .on("child_added", (snapshot) => {
                   var item = snapshot.val();
                   item['.key'] = snapshot.key;
                   items.push(item);
                   this.setState({
                       loggingServices: items
                    });

            }).bind(this);

    },

    handleSubmit: function(e) {
        e.preventDefault();
        if ( this.state.serviceIdText && this.state.serviceIdText.trim().length !== 0 &&
             this.state.memberIdText && this.state.memberIdText.trim().length !== 0
           )
        {
            loggingServices.push({
                memberId:  this.state.memberIdText,
                serviceId: this.state.serviceIdText,
                providerId: localStorage.token
            });
            this.setState({
                memberId:  '',
                serviceId: ''
            });
        }
    },

    componentWillUnmount: function() {
        loggingServices.off();
    },

    onServiceIdChange: function(e) {
        this.setState({serviceIdText: e.target.value});
    },

    onMemberIdChange: function(e) {
        this.setState({memberIdText: e.target.value});
    },

    render: function() {

        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <h2>Logging Service</h2>
                    Service ID: <input onChange={ this.onServiceIdChange } value={ this.state.serviceIdText } />
                    Member  ID: <input onChange={ this.onMemberIdChange } value={ this.state.memberIdText } />
                    <button > ADD </button>
                </form>
                <List items={ this.state.loggingServices } />

            </div>
         )

    }
});

export default LoggingService