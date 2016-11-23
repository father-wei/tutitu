import React from 'react'
import { authService } from '../../core/auth'
import { Link } from 'react-router'


var Nav =React.createClass({
    render: () => {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" >{localStorage.role === "provider"? "Provider: " : "Manager: "}</a>

                    </div>

                    <div className="navbar-header">

                        <a className="navbar-brand" href="#">Home</a>
                    </div>

                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Report</a>
                    </div>


                     <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to='/logout'>{authService.loggedIn()? "Logout" : ""}</Link>&nbsp;
                            </li>
                        </ul>
                    </div>

            </nav>
            )
        }

})

export default Nav;


