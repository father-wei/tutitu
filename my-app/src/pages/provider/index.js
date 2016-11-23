import React from 'react'
import  ServiceListContainer  from '../../components/serviceListModal/serviceListContainer'

var ProviderPage =React.createClass({
    render: () => {
        return (
            <div>
                <h1>Hello Provider</h1>
                <ServiceListContainer />
            </div>
        )
    }
})

export default ProviderPage;
