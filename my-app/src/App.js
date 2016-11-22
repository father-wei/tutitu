import React from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import { authService } from './core/auth'
import  LoginPage  from  './pages/login';
import  ProviderPage  from  './pages/provider';
import  ManagerPage  from  './pages/manager';

const Nav = () => (
    <div>
        <Link to='/logout'>{authService.loggedIn()? "Logout" : ""}</Link>&nbsp;
    </div>
)


const Container = (props) => <div>
    <Nav />
    {props.children}
</div>





const  requireAuth = (nextState, replace) =>{
    if (!authService.loggedIn()) {
        replace({
            pathname: '/login'
        })
    }
}

const logout = (nextState, replace) => {
    if(authService.loggedIn()){
        authService.logout();
        replace({
            pathname: '/login'
        })
    }
}


const App = React.createClass({

    getInitialState() {
        return {
            loggedIn: authService.loggedIn()
        }
    },

    render () {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Container}>
                    <IndexRoute  component={LoginPage} />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/provider' component={ProviderPage}  onEnter={requireAuth} />
                    <Route path='/manager' component={ManagerPage}  onEnter={requireAuth} />
                    <Route path='/logout' component={LoginPage}  onEnter={logout}/>
                </Route>
            </Router>
        )
    }
})

export default App