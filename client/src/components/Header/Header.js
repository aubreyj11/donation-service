import React from 'react'
import { Grid, Header, Icon, Image } from 'semantic-ui-react'
import Navbar from '../Navbar/'
import { GET_USER } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import './Header.css'
import AuthServices from '../../utils/auth'


const HeaderContainer = () => {
  const loggedIn = AuthServices.loggedIn();
  const { data } = useQuery(GET_USER);
  const user = data?.getUser || {};
  console.log(user);
  return (
  <>
   <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          <Header as='h1'>
            <Icon name='truck' color='blue' size='massive' className='truckIcon'/>
            <Header.Content className='headerTitle'>
              ChariTeam Food Waste Donation Service
              <Header.Subheader className='headerSubTitle'>
                Handling your waste so you don't have to.
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column width={2} floated='right'>
          <Header as={'h3'} >
            <Header.Content className='headerStatus'>
              Logged in as <span style={{color: 'blue'}}>{loggedIn ? user.name : 'Guest'}</span>
            </Header.Content>
            <Image src={user.avatar} avatar size='small' />
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Navbar />
      </Grid.Row>
   </Grid>
  </>
  )
}

export default HeaderContainer