import React from 'react';
import { members } from '../../core/domain/members'
import List from './list'

var MemberList = React.createClass({
    getInitialState: function() {
        return {
            members: []
        }
    },

    componentWillMount: function() {
        members.on('value', function(dataSnapshot) {
            var members = [];
            dataSnapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item['.key'] = childSnapshot.key;
                members.push(item);
            }.bind(this));

            this.setState({
                members: members
            });
        }.bind(this));
    },

    componentWillUnmount: function() {
        members.off();
    },

    render: function() {

        return (
            <div>
                <h2>MEMBERS</h2>
                <List items={ this.state.members } />
            </div>
         )

    }
});

export default MemberList