import React from 'react';
import { firebaseDb } from '../../core/firebase';
import { authService } from '../../core/auth';

import { withRouter } from 'react-router'

var LoginPage = withRouter(React.createClass({

    getInitialState: function() {
        if(authService.loggedIn()){
            this.props.router.push('/' + localStorage.role)
        }
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
        authService.login(this.state.username, this.state.password, this.firebaseRef,  (loggedIn, role) => {
            if(loggedIn) {
                if(role === 'manager') {
                    this.props.router.push('/manager')
                }else if (role === 'provider') {
                    this.props.router.push('/provider')
                }

            }
        });
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
}));

export default LoginPage;