import React, {PropTypes} from 'react';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';


var Modal =React.createClass({
    getInitialState: function() {
        return {
            isShowingModal: false
        }
    },
    handleClick : function(){
        this.setState({isShowingModal: true})
        if(this.props.component === "Log"){
            this.props.cb();
        }

    },
    handleClose : function(){ this.setState({isShowingModal: false})},

    render: function() {
        return <div onClick={this.handleClick}>
            <button className="btn btn-default" type="button">{this.props.component}</button>
          {
              this.state.isShowingModal &&
              <ModalContainer onClose={this.handleClose}>
                  <ModalDialog onClose={this.handleClose}>
                      {this.props.children}
                  </ModalDialog>
              </ModalContainer>
              }
        </div>;
    }
})

export default Modal;
