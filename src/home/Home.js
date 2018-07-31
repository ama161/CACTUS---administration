import React, { Component } from 'react';
import { withRouter } from 'react-router'

import './Home.css';
import {isAdmin} from '../services/user';
import Menu from './menu/Menu';
import Reserves from './reserves/Reserves';

class Home extends Component {
    constructor(props){
        super(props);

        this.onHandleNewReserve = this.onHandleNewReserve.bind(this);

        this.state={
            menuOption: '',
            showModal: false,
        }
    }

    componentWillMount(){
        this.setState({menuOption: 'reserves'})
    }

    componentDidMount(){
        isAdmin()
        .then((result) => {
            if(!result)
                this.props.history.push('/');
        }).catch(error => console.log(error));
    }

    onHandleNewReserve(){
        console.log('onHandleNewReserve');
        this.setState({showModal: true})
    }

    render() {
        return (
            <div className="container-home">
                <Menu 
                    onHandleNewReserve={() => this.onHandleNewReserve()}
                    onHandleReserves={() => this.setState({menuOption: 'reserves'})}
                />
                <div className="container-info">
                    {this.state.menuOption === 'reserves' 
                        ? <Reserves/>
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Home);