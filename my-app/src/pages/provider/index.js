import React from 'react'
import  ServiceList  from '../../components/list/serviceList'
import  MemberList  from '../../components/list/memberList'
import  LoggingService  from '../../components/loggingService'


var ProviderPage =React.createClass({
    render: () => {
        return (
            <div>
                <LoggingService />
                <div className="well">
                    <div className="row">
                        <div className="col-md-6"><ServiceList /></div>
                        <div className="col-md-6"><MemberList /></div>
                    </div>
                </div>

            </div>
        )
    }
})

export default ProviderPage;
