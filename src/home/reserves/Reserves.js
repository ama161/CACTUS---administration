import React from 'react';
import { Table, Icon, message as Message } from 'antd';

import {
    getAllReserves, getAllPending, canceledReserve, acceptedReserve
} from '../../services/reserves'
import Modal from '../../utils/Modal';
import './Reserves.css';

const Column = Table.Column;

class Reserves extends React.Component{
    constructor(props){
        super(props);

        this.onHandleButton = this.onHandleButton.bind(this);
        this.onHandleIcon = this.onHandleIcon.bind(this);

        this.state={
            btnSelected: null,
            reserves: [],
            showModalCancel: false,
            showModalAccepted: false,
            idReserveClicked: null,
        }
    }
    
    onHandleButton(type){
        getAllReserves(type).then(reserves => {
            if(typeof(reserves) === 'object')
                this.setState({reserves: Object.values(reserves), btnSelected: type})
            else
                this.setState({reserves: [], btnSelected: type})
        }).catch(() => this.setState({reserves: [], btnSelected: type}));;
    }

    componentWillMount(){
        getAllPending().then(reserves => {
            if(typeof(reserves) === 'object')
                this.setState({reserves: Object.values(reserves), btnSelected: 'pending'})
            else
                this.setState({reserves: [], btnSelected: 'pending'})
        }).catch(() => this.setState({reserves: [], btnSelected: 'pending'}));
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
        });
    }

    onHandleIcon(type, id){
        if(type === 'canceled') {
            this.setState({showModalCancel: true, idReserveClicked: id})
        }

        if(type === 'accepted') {
            this.setState({showModalAccepted: true, idReserveClicked: id})
        }       
    }

    render(){
        return(
            <div>
                {this.state.showModalCancel
                    ? <Modal 
                        title="Are you sure you want to cancel this reserve?"
                        show={this.state.showModalCancel}
                        onHandleOk={() => {
                            canceledReserve(this.state.idReserveClicked).then(result => {
                                Message.info('Reserve Canceled');
                                this.setState({showModalAccepted: false, idReserveClicked: null})   
                                this.onHandleButton(this.state.btnSelected);                              
                            })
                        }}
                        onHandleCancel={() => this.setState({showModalCancel: false, idReserveClicked: null})}/>
                    : null
                }
                {this.state.showModalAccepted
                    ? <Modal 
                        title="Are you sure accepte this Reserve?"
                        show={this.state.showModalAccepted}
                        onHandleOk={() => {
                            acceptedReserve(this.state.idReserveClicked).then(result => {
                                Message.info('Reserve Accepted');
                                this.setState({showModalAccepted: false, idReserveClicked: null})   
                                this.onHandleButton(this.state.btnSelected);                              
                            })
                        }}
                        onHandleCancel={() => this.setState({showModalAccepted: false, idReserveClicked: null})}/>
                    : null
                }
                <div className="container-buttons">
                    <button onClick={() => this.onHandleButton('pending')}>Pending</button>    
                    <button onClick={() => this.onHandleButton('canceled')}>Canceled</button>    
                    <button onClick={() => this.onHandleButton('accepted')}>Accepted</button>    
                </div>
                <Table dataSource={this.state.reserves} rowKey='id' onChange={this.handleChange}>
                    <Column
                        title="Date"
                        dataIndex="date"
                        key="date"
                    />
                    <Column
                        title="Time"
                        dataIndex="time"
                        key="time"
                    />
                    <Column
                        title="Diners"
                        dataIndex="diners"
                        key="diners"
                    />
                    <Column
                        title="Name Client"
                        dataIndex="name"
                        key="name"
                    />
                    <Column
                        title="Email Client"
                        dataIndex="email"
                        key="email"
                    />
                    <Column
                        title="Phone Client"
                        dataIndex="phone"
                        key="phone"
                    />
                    <Column
                        title="Status Reserve"
                        key="status"
                        render={
                            (text, record) => (
                                <span>{record.status}
                                    {record.status === 'pending'
                                        ? <div>
                                            <span onClick={() => this.onHandleIcon('accepted', record.id)}><Icon type="check-circle" title="accepted"/></span>
                                            <span onClick={() => this.onHandleIcon('canceled', record.id)}><Icon type="close-circle" title="canceled"/></span>
                                        </div>
                                        : null
                                    }
                                </span>
                            )}
                    />
                </Table>
            </div>                
        )
    }
}

export default Reserves