import React from 'react';
import { firebaseDb } from '../../core/firebase';

var LoginPage = React.createClass({

    getInitialState: function() {
        return {
            username: '',
            password: ''
        };
    },
    componentWillMount: function() {
        this.firebaseRef = firebaseDb.ref('users');

    },

    componentWillUnmount: function() {
        this.firebaseRef.off();
    },

    onUsernameChange: function(e) {
        this.setState({username: e.target.value});
    },

    onPasswordChange: function(e) {
        this.setState({password: e.target.value});
    },

    handleSubmit: function(e) {
        e.preventDefault();
        var that = this;
        if (this.state.username && this.state.username.trim().length !== 0
            &&  this.state.password && this.state.password.trim().length !== 0) {

            this.firebaseRef.orderByChild("username").equalTo(this.state.username).on("child_added", (snapshot) =>{

                if(snapshot.val().password == this.state.password){
                    alert("pass!")
                }else{
                    alert("no!")
                }

            });
        }
    },

    render: function() {
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    Username: <input onChange={ this.onUsernameChange } value={ this.state.username } />
                    Password: <input onChange={ this.onPasswordChange } value={ this.state.password } />
                    <button>Login</button>
                </form>
            </div>
            );
    }
});

export default LoginPage;