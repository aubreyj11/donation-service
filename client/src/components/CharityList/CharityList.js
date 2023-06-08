import React from 'react'
import { Container, Header, List, Grid, Image, Divider, Modal, Button, Input, TextArea, Form, Dropdown, Menu } from 'semantic-ui-react'
import './CharityList.css'
import { Calendar as ReactCalendar } from 'react-calendar'
import AuthService from "../../utils/auth";
import { GET_USER } from '../../utils/queries'
import { useQuery } from '@apollo/client'





const CharityList = () => {
const loggedIn = AuthService.loggedIn();
const { data } = useQuery(GET_USER);
const user = data?.getUser || {};
const options = [
    { key : 1, text: 'Morning', value: 1},
    { key : 2, text: 'Afternoon', value: 2},
    { key : 3, text: 'Evening', value: 3},
]

const [date, setDate] = React.useState(new Date())    
const [open, setOpen] = React.useState(false)
  return (
    <>
    <Header as='h2' textAlign='center'>
        Food Donation Centers
        <Header.Subheader>Find out more about our local food banks and the organizations serving our community.</Header.Subheader>
        <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Donate</Button>}
      size='small'
    >
      <Modal.Header>Select a Scheduled Pick Up Day</Modal.Header>
      <Modal.Content>
        <div className='calendar-ctn'>
            <ReactCalendar onChange={setDate} value={date} />
        </div>
        <div className='text-center'>
            Selected date: {date.toDateString()}
        </div>
        <Modal.Description>
          <Header>Select A Pick Up Time</Header>
          <Menu compact>
          <Dropdown
            placeholder='Select a TIme'
            fluid
            selection
            options={options}
             />
            </Menu>
            <p>
            We've found the following Address associated with your profile.
          </p>
          {loggedIn ? (
            <Input value={user.address}/>
          ) : (
            <Input placeholder='1234 Main St' />
          )}
          {loggedIn ? (
            <Input value={user.city}/>
          ) : (
            <Input placeholder='City' />
          )}
          {loggedIn ? (
            <Input value={user.zipcode}/>
          ) : (
            <Input placeholder='Zip Code' />
          )}
          <Header>Additional Comments</Header>
          <Form>
          <TextArea placeholder='Additional Comments'  style={{ resize: "none"}}/>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Submit"
          labelPosition='center'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
    </Header>
    <Divider />
    <Container>
        <Grid columns={2} divided >
            <Grid.Column>
                <Header as='h4' content='Second Harvest Food Bank of Orange County' subheader='1 of 2 food banks in Orange County' textAlign='center' />
                <Image src='assets/foodbank-logo-SH.png' size='large'  className='food-bank-img' centered />
                <Divider horizontal />
                    <Grid columns={2} container >
                        <Grid.Column>
                            <List relaxed>
                                <List.Item icon='phone' header='Phone Number'content='(949) 653-2900' />
                                <List.Item icon='map' header='Address' content='8014 Marine Way, Irvine, CA 92618' />
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List relaxed>
                            <List.Item icon='mail' header='Email' content={<a href='mailto:test@test.com'>test@test.com</a>} />
                            <List.Item icon='globe' header='Website' content={<a href='http://feedoc.org/'>feedoc.org</a>} />
                            </List>
                        </Grid.Column>
                    </Grid>
            </Grid.Column>
            <Grid.Column>
                <Header as='h4' content='Community Action Partnership of Orange County Food Bank' subheader='2 of 2 food banks in Orange County' textAlign='center' />
                <Image src='assets/foodbank-logo-CAP.png' size='large' className='food-bank-img' centered />
                <Divider horizontal />
                    <Grid columns={2} container>
                        <Grid.Column>
                            <List relaxed>
                                <List.Item icon='phone' header='Phone Number'content='(714) 897-6670' />
                                <List.Item icon='map' header='Address' content='11870 Monarch Street, Garden Grove, CA 92841' />
                            </List>
                        </Grid.Column>
                        <Grid.Column>
                            <List relaxed>
                                <List.Item icon='mail' header='Email' content={<a href='mailto:test@test.com'>test@test.com</a>} />
                                <List.Item icon='globe' header='Website' content={<a href='http://ocfoodbank.org/'>ocfoodbank.org</a>} />
                            </List>
                        </Grid.Column>
                    </Grid>
            </Grid.Column>
        </Grid>
    <Divider section />
        <Header as='h3' textAlign='center' content='Other Charities:' />
        <Grid columns={3} divided>
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