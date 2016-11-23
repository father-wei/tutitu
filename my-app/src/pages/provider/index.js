import React from 'react'
import  ServiceList  from '../../components/list/serviceList'
import  MemberList  from '../../components/list/memberList'
import  LoggingService  from '../../components/loggingService'


var ProviderPage =React.createClass({
    render: () => {
        return (
            <div>
                <h1>Hello Provider</h1>
                <LoggingService />
                <ServiceList />
                <MemberList />
            </div>
        )
    }
})

export default ProviderPage;
