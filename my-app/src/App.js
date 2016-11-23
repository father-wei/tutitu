import React from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import { authService } from './core/auth'
import  LoginPage  from  './pages/login';
import  ProviderPage  from  './pages/provider';
import  ManagerPage  from  './pages/manager';
import Nav from './components/nav'

/*const Nav = () => (
    <div>
        <Link to='/logout'>{authService.loggedIn()? "Logout" : ""}</Link>&nbsp;
    </div>
)*/


const Container = (props) => <div>
    <h2>ChocAn</h2>
    {authService.loggedIn()? <Nav /> : <div/>}

    <div >
        {props.children}
    </div>
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
                    <IndexRoute  component={LoginPage}/>
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