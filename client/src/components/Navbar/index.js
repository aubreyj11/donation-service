import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom';
import AuthService from "../../utils/auth"

const loggedIn = AuthService.loggedIn();
export default class Navbar extends Component {

    state = { activeItem: 'home' }    

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }


    render() {
        const { activeItem } = this.state

        return(
            <Menu secondary pointing style={{margin: '0px 0px 0px 15px'}}>
                <Menu.Item 
                    as={NavLink} exact to="/"
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/">
                    Home
                    </Link>
                </Menu.Item>
                <Menu.Item 
                    as={NavLink} exact to="/about"
                    name='about'
                    active={activeItem === 'about'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/about">
                    About Us
                    </Link>
                </Menu.Item>
                <Menu.Item 
                    as={NavLink} exact to="/charities"
                    name='charities'
                    active={activeItem === 'charities'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/charities">
                    Charities
                    </Link>
                </Menu.Item>
                <Menu.Item
                    as={NavLink} exact to="/profile"
                    name='profile'
                    active={activeItem === 'Profile'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/profile">
                    Profile
                    </Link>
                </Menu.Item>
                <Menu.Item 
                    name='login'
                    active={activeItem === 'login'}
                    position='right'
                    >
                        {loggedIn ? (
                            <Link to = "/" onClick={() => AuthService.logout()}>Log Out</Link>
                        ) : (
                            <Link to="/login">Log In</Link>
                        )}
                </Menu.Item>
            </Menu>
        )
    }
}