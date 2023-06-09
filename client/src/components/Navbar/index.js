import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom';
import AuthService from "../../utils/auth"

const loggedIn = AuthService.loggedIn();
export default class Navbar extends Component {

    state = { activeItem: 'home' }    

    //will set active element in navbar to the element that triggers the event using its name attribute
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }


    render() {
        const { activeItem } = this.state

        return(
            <Menu secondary pointing stackable>
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
                    as={NavLink} exact to="/donation"
                    name='donation'
                    active={activeItem === 'Donation'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/donation">
                    Donate
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
                    {/* If logged in Menu.Item = 'Logout', else Menu.Item = 'Log In' */}
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