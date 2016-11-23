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
            <div className="well">
                <form onSubmit={ this.handleSubmit }>
                    <h2>Logging Service <button className="btn btn-default" type="button">Add Service</button></h2>
                    <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="control-label">SERVICE CODE</label>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={ this.onServiceIdChange } value={ this.state.serviceIdText } />
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="button">Search</button>
                                    </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="control-label">MEMBER CODE</label>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={ this.onMemberIdChange } value={ this.state.memberIdText } />
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button">Search</button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <label className="control-label">Pick A Date</label>
                            <input className="form-control"  type="date"/>
                        </div>
                    </div>

                    </div>



                </form>


            </div>
         )

    }
});

export default LoggingService

/*
* <List items={ this.state.loggingServices } />
* */