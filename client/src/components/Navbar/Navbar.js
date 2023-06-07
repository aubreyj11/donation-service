import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import AuthService from "../../utils/auth";

const loggedIn = AuthService.loggedIn();
export default class Navbar extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })


    render() {
        const { activeItem } = this.state

        return(
            <Menu secondary pointing>
                <Menu.Item 
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/">
                    Home
                    </Link>
                </Menu.Item>
                <Menu.Item 
                    name='charities'
                    active={activeItem === 'charities'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/charities">
                    Charities
                    </Link>
                </Menu.Item>
                <Menu.Item
                    name='Profile'
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
                            <Link to="/login" onClick={this.handleItemClick}>Log In</Link>
                        )}
                </Menu.Item>
            </Menu>
        )
    }
}