import React from 'react'
import { Grid, Header, Icon, Image } from 'semantic-ui-react'
import Navbar from '../Navbar/'
import { GET_USER } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import AuthServices from '../../utils/auth'
import { Link } from 'react-router-dom'


const HeaderContainer = (props) => {
  // Use AuthService to check if user is logged in
  const loggedIn = AuthServices.loggedIn();
  // Get user data from query
  const { data } = useQuery(GET_USER);
  // Set user to empty object if no data
  const user = data?.getUser || {};
  return (
  <>
   <Grid style={{marginLeft: "5px", marginRight: "5px"}} stackable>
      <Grid.Row>
        {/* Title Header */}
        <Grid.Column width={12}>
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
        <Grid.Column width={4} floated='right'>
          <Link to="/profile">
          {/* Avatar Header */}
            <Header as={'h5'} textAlign='right' size='medium' style={{ paddingTop:'10px' }}>
              <Header.Content>
                {/* If logged in, display username, else display 'Guest' */}
                Logged in as <span style={{color: 'blue'}}>{loggedIn ? user.name : 'Guest'}</span>
              </Header.Content>
              <Image src={user.avatar} className='avaSmall' avatar size='small' />
            </Header>
          </Link> 
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Navbar {...props} />
      </Grid.Row>
   </Grid>
  </>
  )
}

export default HeaderContainer