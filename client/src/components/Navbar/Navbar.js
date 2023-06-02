import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

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
                    Home
                </Menu.Item>
                <Menu.Item 
                    name='charities'
                    active={activeItem === 'charities'}
                    onClick={this.handleItemClick}
                >
                    Charities
                </Menu.Item>
                <Menu.Item
                    name='Profile'
                    active={activeItem === 'Profile'}
                    onClick={this.handleItemClick}
                >
                    Profile
                </Menu.Item>
                <Menu.Item 
                    name='login'
                    active={activeItem === 'login'}
                    onClick={this.handleItemClick}
                    position='right'
                    >
                    <Link to="/login">
                    Log In
                    </Link>
                </Menu.Item>
            </Menu>
        )
    }
}