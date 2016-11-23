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

        var items = [];
        members.orderByChild("providerId")
            .equalTo(localStorage.token)
            .on("child_added", (snapshot) => {
            var item = snapshot.val();
            item['.key'] = snapshot.key;
            items.push(item);
            this.setState({
                members: items
            });

        }).bind(this);

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