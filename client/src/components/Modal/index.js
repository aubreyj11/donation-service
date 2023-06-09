import React from 'react'
import {Navigate} from 'react'
import { GET_USER } from '../../utils/queries'
import { useQuery } from '@apollo/client'
import AuthService from "../../utils/auth";
import { Calendar as ReactCalendar } from 'react-calendar'
import { Button, Header, Modal, Menu, Dropdown, Input, Form, TextArea } from 'semantic-ui-react'


function ReactModal() {
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
    <div>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='blue' >Donate</Button>}
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
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
    </div>
  )
}

export default ReactModal;