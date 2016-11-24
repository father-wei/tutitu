import React from 'react';
import { loggingServices } from '../../core/domain/loggingServices'
import List from './list'
import Modal from '../modal'
import { services } from '../../core/domain/services'
import { members } from '../../core/domain/members'

var LoggingService = React.createClass({
    getInitialState: function() {
        return {
            loggingServices: [],
            serviceIdText: '',
            memberIdText: '',
            dateText: '',
            serviceModalMessage: <h1>The service search result is not found</h1>,
            memberModalMessage: <h1>The member search result is not found</h1>,
            serviceValidate: false,
            memberValidate: false,
            serviceIdInputTarget: null,
            memberIdTarget: null,
            showLoggingTable: false

        }
    },

    componentWillMount: function() {
        var items = [];
        loggingServices.orderByChild("providerId")
            .equalTo(localStorage.token)
            .on("child_added", (snapshot) => {
                   var item = snapshot.val();
                   item['.key'] = snapshot.key;

                   services.orderByChild("code")
                        .equalTo(item.serviceId)
                        .on("value", (childsnapshot) => {
                            item.price =  Object.values(childsnapshot.val())[0].price;
                            item.serviceName =  Object.values(childsnapshot.val())[0].name;
                            if( new Date().getTime() - new Date(item.date).getTime() < 86400000 * 7 ){
                                items.push(item);
                                this.setState({
                                    loggingServices: items
                                });

                                items.sort(function(a, b){
                                    if(a.serviceName < b.serviceName) return -1;
                                    if(a.serviceName > b.serviceName) return 1;
                                    return 0;
                                })
                            }
                    });




            }).bind(this);

    },

    handleSubmit: function() {
        loggingServices.push({
            memberId:  this.state.memberIdText,
            serviceId: this.state.serviceIdText,
            providerId: localStorage.token,
            date: this.state.dateText
        });
    },

    componentWillUnmount: function() {
        loggingServices.off();
    },

    onServiceIdChange: function(e) {
        this.setState({serviceIdText: e.target.value, serviceIdInputTarget: e.target});
        services.orderByChild("code")
            .equalTo( e.target.value)
            .on("value", (snapshot) => {
                 if(snapshot.val()){
                    var serviceObj = Object.values(snapshot.val())[0];
                    this.setState({serviceValidate: true});
                    this.setState({
                        serviceModalMessage: <ul className="list-group">
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-6">  CODE: </div>
                                                <div className="col-md-6"> {serviceObj.code} </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-6">  NAME: </div>
                                                <div className="col-md-6"> {serviceObj.name} </div>
                                            </div>

                                        </li>
                                        <li className="list-group-item">
                                            <div className="row">
                                                <div className="col-md-6">  DESCRIPTION: </div>
                                                <div className="col-md-6"> {serviceObj.description} </div>
                                            </div>
                                        </li>
                                    </ul>




                    });
                    e.target.classList.remove("alert", "alert-dismissible", "alert-danger");
                    e.target.classList.add("alert", "alert-dismissible", "alert-success");
                 }
                 else {
                    this.setState({serviceModalMessage: <h1>The service search result is not found</h1>})
                    e.target.classList.remove("alert", "alert-dismissible","alert-success");
                    e.target.classList.add("alert", "alert-dismissible", "alert-danger");

                    this.setState({serviceValidate: false });
                 }

        }).bind(this);
    },

    onMemberIdChange: function(e) {
        var target = e.target;
        this.setState({memberIdText: e.target.value,  memberIdTarget: target});

        members.orderByChild("code")
            .equalTo( e.target.value)
            .on("value", (snapshot) => {
            if(snapshot.val()){
                this.setState({memberValidate: true});
                var memberObj = Object.values(snapshot.val())[0];
                this.setState({
                    memberModalMessage: <ul className="list-group">
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-6">  CODE: </div>
                                <div className="col-md-6"> {memberObj.code} </div>
                            </div>
                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-6">  NAME: </div>
                                <div className="col-md-6"> {memberObj.name} </div>
                            </div>

                        </li>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-6">  DESCRIPTION: </div>
                                <div className="col-md-6"> {memberObj.description} </div>
                            </div>
                        </li>
                    </ul>
                    });

                target.classList.remove("alert", "alert-dismissible", "alert-danger");
                target.classList.add("alert", "alert-dismissible", "alert-success");

            }
            else {
                this.setState({memberModalMessage: <h1>The member search result is not found</h1>})
                target.classList.remove("alert", "alert-dismissible","alert-success");
                target.classList.add("alert", "alert-dismissible", "alert-danger");
                this.setState({memberValidate: false});
            }
        }).bind(this);
    },

    onDateChange : function(e) {
        this.setState({dateText: e.target.value});

    },

    addServiceSuccessCB: function(){
        if(this.state.serviceValidate && this.state.memberValidate && this.state.dateText){

            this.handleSubmit()
            this.setState({
               serviceIdText: '',
               memberIdText: ''

           });

           this.state.serviceIdInputTarget.classList.remove("alert", "alert-dismissible","alert-success");
           this.state.memberIdTarget.classList.remove("alert", "alert-dismissible","alert-success");

            this.setState(
                {serviceValidate: false,
                memberValidate: false,});


        }
    },

    handleReportClick: function(e){
        if(this.state.showLoggingTable === true){
            this.setState({showLoggingTable : false})
        }else {
            this.setState({showLoggingTable : true})
        }
    },


    render: function() {

        return (
            <div className="well">

                    <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label">SERVICE CODE</label>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={ this.onServiceIdChange } value={ this.state.serviceIdText } />
                                    <span className="input-group-btn">
                                        <Modal component="Search">
                                            {this.state.serviceModalMessage}
                                        </Modal>
                                    </span>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label">MEMBER CODE</label>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={ this.onMemberIdChange } value={ this.state.memberIdText } />
                                <span className="input-group-btn">
                                    <Modal component="Search">
                                        {this.state.memberModalMessage}
                                    </Modal>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <label className="control-label">Pick A Date</label>
                            <input className="form-control"  type="date" onChange={ this.onDateChange } value={this.state.dateText}/>
                        </div>
                    </div>
                        <div className="col-md-1">
                            <div className="form-group">
                                <label className="control-label">Log </label>
                                <Modal component="Log" cb={this.addServiceSuccessCB}>
                                 {(this.state.serviceValidate && this.state.memberValidate && this.state.dateText)?  <h1 className="alert alert-dismissible alert-success" >Saved Successfully</h1> : <h1 className="alert alert-dismissible alert-danger">Data is invalid, unable to save, please double check</h1> }

                                </Modal>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="form-group">
                                <label className="control-label">Report </label>
                                <div><button onClick={this.handleReportClick} className="btn btn-default" type="button">{this.state.showLoggingTable? "Hide" : "Show" }</button></div>
                            </div>
                        </div>





                    </div>
                    { this.state.showLoggingTable ? <List items={ this.state.loggingServices } />  : null }
            </div>
         )
    }
});

export default LoggingService

