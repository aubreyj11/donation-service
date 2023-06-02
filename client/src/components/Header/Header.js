import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import Navbar from '../Navbar/Navbar'

const HeaderContainer = () => {
  return (
    <Header as='h1'>
    <Icon name='truck' color='blue' size='massive' />
    <Header.Content>
      ChariTeam Food Waste Donation Service
      <Header.Subheader>
        Handling your waste so you don't have to.
      </Header.Subheader>
    </Header.Content>
    <Navbar />
  </Header>
  )
}

export default HeaderContainer