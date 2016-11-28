import React from 'react'

import  ServiceList  from '../../components/list/serviceList'
import  MemberList  from '../../components/list/memberList'
import  ProviderList  from '../../components/list/providerList'
import  List  from '../../components/loggingService/list'
import  { loggingServices }  from '../../core/domain/loggingServices'
import  { services }  from '../../core/domain/services'


var ManagerPage =React.createClass({
    getInitialState: function() {
        return {
           loggingServices: [],
           sum : 0
        };
    },
    componentWillMount: function() {


        var items = [];
        loggingServices.on("value", (snapshot) => {
                snapshot.forEach( (childSnapshot) =>  {
                    var item = childSnapshot.val();
                    item['.key'] = childSnapshot.key;

                    services.orderByChild("code")
                        .equalTo(item.serviceId)
                        .on("value", (childsnapshot) => {
                            if(childsnapshot.val() && Object.values(childsnapshot.val())[0]){
                                item.price =  Object.values(childsnapshot.val())[0].price;

                                item.serviceName =  Object.values(childsnapshot.val())[0].name;
                                if( new Date().getTime() - new Date(item.date).getTime() < 86400000 * 7 ){
                                    items.push(item);
                                        this.setState({
                                        loggingServices: items,
                                         sum: this.state.sum + item.price
                                    });

                                    items.sort(function(a, b){
                                        if(a.serviceName < b.serviceName) return -1;
                                        if(a.serviceName > b.serviceName) return 1;
                                        return 0;
                                    })

                            }

                        }
                    });
                })
            })

   },





    render: function() {
        return (
            <div>
                <div className="well">
                    <div className="row">
                        <div className="col-md-6"><ServiceList /></div>
                        <div className="col-md-6"><MemberList /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"><ProviderList /></div>

                    </div>
                </div>
                <div className="well">
                <h2>Weekly Report </h2>
                <List items={ this.state.loggingServices } sum= {this.state.sum}/>
                </div>
            </div>
        )
    }
})

export default ManagerPage;
