import React from 'react'
import { Container, Header, List, Grid, Image, Divider, Button } from 'semantic-ui-react'
import ReactModal from '../Modal/index.js'
import AuthService from "../../utils/auth";
import { useNavigate } from 'react-router-dom';

const CharityList = () => {
    const navigate = useNavigate();
    // Use AuthService to check if user is logged in
    const loggedIn = AuthService.loggedIn();
  return (
    <>
    <Header as='h2' textAlign='center'>
        Food Donation Centers
        <Header.Subheader>Find out more about our local food banks and the organizations serving our community.</Header.Subheader>
    </Header>
    {/* if loggedIn, display donation signup modal, else button redirects to login */}
    {loggedIn ? (
        <div className='mx-auto'><ReactModal /></div> ) : (<div className='mx-auto'><Button onClick={()=>{navigate('/login')}}>Schedule Pickup</Button></div>
         )}
        <Divider />
    <Container style={{margin: "0px 0px 30px 0px"}}>
        {/* Food Bank Grid Columns */}
        <Grid columns={2} divided stackable>
            <Grid.Column>
                <Header as='h4' content='Second Harvest Food Bank of Orange County' subheader='1 of 2 food banks in Orange County' textAlign='center' />
                <Image src='assets/foodbank-logo-SH.png' size='large'  className='food-bank-img' centered />
                <Divider horizontal />
                    <Grid columns={2} container doubled>
                        <Grid.Column>
                            <List relaxed >
                                <List.Item icon='phone' header='Phone Number'content='(949) 653-2900' />
                                <List.Item icon='map' header='Address' content='8014 Marine Way, Irvine, CA 92618' />
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List relaxed>
                            <List.Item icon='mail' header='Email' content={<a href='mailto:info@feedoc.org'>info@feedoc.org</a>} />
                            <List.Item icon='globe' header='Website' content={<a href='http://feedoc.org/'>feedoc.org</a>} />
                            </List>
                        </Grid.Column>
                    </Grid>
            </Grid.Column>
            <Grid.Column>
                <Header as='h4' content='Community Action Partnership of Orange County Food Bank' subheader='2 of 2 food banks in Orange County' textAlign='center' />
                <Image src='assets/foodBank-logo-CAP.png' size='large' className='food-bank-img' centered />
                <Divider horizontal />
                    <Grid columns={2} container doubled>
                        <Grid.Column>
                            <List relaxed>
                                <List.Item icon='phone' header='Phone Number'content='(714) 897-6670' />
                                <List.Item icon='map' header='Address' content='11870 Monarch Street, Garden Grove, CA 92841' />
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List relaxed>
                                <List.Item icon='mail' header='Email' content={<a href='mailto:info@capoc.org'>info@capoc.org</a>} />
                                <List.Item icon='globe' header='Website' content={<a href='http://ocfoodbank.org/'>ocfoodbank.org</a>} />
                            </List>
                        </Grid.Column>
                    </Grid>
            </Grid.Column>
        </Grid>
    <Divider section />
        <Header as='h3' textAlign='center' content='Other Charities:' />
        {/* 'Partnered' Charities Grid Columns */}
        <Grid columns={3}  doubling centered >
            <Grid.Column>
                <Image src='assets/charity-logo-mk.png' size='small' centered />
                <Header as='h4' content='Mary&#39;s Kitchen' textAlign='center' />
                <List>
                    <List.Item icon='phone' content='(714) 633-0444' />
                    <List.Item icon='map' content='790 East Debra Lane, Anaheim, CA 92805' />
                    <List.Item icon='globe' content={<a href='https://maryskitchen.org/'>maryskitchen.org</a>} />
                </List>
            </Grid.Column>
            <Grid.Column>
                <Image src='assets/charity-logo-fc.jpg' size='small' centered />
                <Header as='h4' content='Friendly Center' textAlign='center' />
                <List>
                    <List.Item icon='phone' content='(714) 771-5300' />
                    <List.Item icon='map' content='147 W Rose Ave, Orange, CA 92867' />
                    <List.Item icon='globe' content={<a href='https://friendlycenter.org/'>friendlycenter.org</a>} />
                </List>
            </Grid.Column>
            <Grid.Column>
                <Image src='assets/charity-logo-sc.png' size='small' centered />
                <Header as='h4' content='The Seva Collective' textAlign='center' />
                <List>
                    <List.Item icon='phone' content='(714) 584-7573' />
                    <List.Item icon='map' content='1441 E. Chestnut Ave, Santa Ana, CA 92701' />
                    <List.Item icon='globe' content={<a href='https://thesevacollective.org/'>thesevacollective.org</a>} />
                </List>
            </Grid.Column>
        </Grid>

    </Container>
</>
  )
}

export default CharityList