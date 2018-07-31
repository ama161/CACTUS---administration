import React, { Component } from 'react';
import {Card, CardBody} from 'reactstrap';
import { withRouter } from 'react-router'

import Input from '../utils/Input'
import {login} from '../services/login'
import {isAdmin} from '../services/user'
import './Login.css';

class Login extends Component {
    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);

        this.state={
            email: '',
            password: '',
        }
    }

    componentWillMount(){
        isAdmin()
        .then((result) => {
            console.log(result);
            if(result)
                this.props.history.push('/home');
        }).catch(error => console.log(error));
    }

    handleLogin(){
        login(this.state.email, this.state.password)
        .then(result => {
            if(result){
                this.props.history.push('/home');
            }
        })
    }

    render() {
        return (
        <Card className="container-login">
            <CardBody>
                <span className="container-logo"><span className="logo"></span> <h1>Cactus </h1></span>                
                <Input 
                    value={this.state.email}
                    type="email" 
                    label="email" 
                    onChange={(event) => this.setState({email: event.target.value})}
                />
                <Input 
                    value={this.state.password}
                    type="password" 
                    label="password" 
                    onChange={(event) => this.setState({password: event.target.value})}
                />
                <button className="btn-login"
                        onClick={() => this.handleLogin()}
                    >Login
                </button>
            </CardBody>
        </Card>
        );
    }
}

export default withRouter(Login);