import React from 'react';
import { Modal as ModalANT } from 'antd';

import './Modal.css';

class Modal extends React.Component {
    constructor(props){
        super(props);

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

        this.state= {
            show: false
        }
    }

    componentWillMount(){
        this.setState({show: this.props.show})
    }

    handleOk(e){
        this.setState({
            show: false,
        });

        this.props.onHandleOk();
    }

    handleCancel(e){
        this.setState({
            visible: false,
        })

        this.props.onHandleCancel()
    }

    render() {
        return (
            <div>
                <ModalANT
                    visible={this.state.show}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                {this.props.title}
                </ModalANT>
            </div>
        );
    }
}

export default Modal;