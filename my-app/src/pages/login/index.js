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
            <div className="row">
                <form onSubmit={ this.handleSubmit } className="col-md-6 col-md-offset-3 form-horizontal">
                    <div className="form-group">
                        <label htmlFor="inputUserId" className="col-lg-2 control-label">User Id</label>
                        <div className="col-lg-10">
                             <input onChange={ this.onUsernameChange } value={ this.state.username } type="text" className="form-control" id="inputUserId" placeholder="User Id" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="col-lg-2 control-label">Password</label>
                        <div className="col-lg-10">
                            <input onChange={ this.onPasswordChange } value={ this.state.password } type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-10 col-lg-offset-2">
                            <button type="reset" className="btn btn-default">Cancel</button>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>

                </form>
            </div>
            );
    }
}));

export default LoginPage;