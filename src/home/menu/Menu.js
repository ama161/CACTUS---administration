import React from 'react';
import { withRouter } from 'react-router'
import { Menu as MenuANT, Icon, message as Message} from 'antd';

import './Menu.css';
import {logout} from '../../services/logout';
const MenuItem = MenuANT.Item;
const MenuItemGroup = MenuANT.ItemGroup;

class Menu extends React.Component {
    constructor(props){
        super(props);

        this.onHandleLogout = this.onHandleLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.state = {

        }
    }

    handleClick(e){
        if(e.key === '1')  this.props.onHandleReserves();  
        if(e.key === '2')  this.onHandleLogout();  
    }

    onHandleLogout(){
        console.log('logout');
        logout().then(message => {
            this.props.history.push('/');
            Message.info(message);
        })
    }

    render() {
        return (
            <MenuANT
                onClick={this.handleClick}
                style={{ width: 256, height: '100vh' }}
                defaultSelectedKeys={['1']}
                mode="inline"
            >
                <MenuItemGroup 
                    key="g1" 
                    title={<span className="container-logo"><span className="logo"></span> <h1>Cactus </h1></span>}
                >
                    <MenuItem key="1"><Icon type="solution" /> Reserves</MenuItem>        
                    <MenuItem key="2"><Icon type="logout" /> Logout</MenuItem>   
                </MenuItemGroup>
            </MenuANT>
        );
    }
}

export default withRouter(Menu);