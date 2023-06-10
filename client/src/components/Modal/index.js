import React from 'react'
import { ADD_FOOD_DONATION } from '../../utils/mutations';
import { GET_USER } from '../../utils/queries'
import { useQuery, useMutation } from '@apollo/client'
import { Calendar as ReactCalendar } from 'react-calendar'
import { Button, Header, Modal, Menu, Dropdown, Input, Form, TextArea } from 'semantic-ui-react'


function ReactModal() {

    const { data } = useQuery(GET_USER);
    const [addFoodDonation] = useMutation(ADD_FOOD_DONATION);
    const user = data?.getUser || {};
    const options = [
      { key : 1, text: 'Morning', value: 1},
      { key : 2, text: 'Afternoon', value: 2},
      { key : 3, text: 'Evening', value: 3},
    ]
    const [errorMessage, setErrorMessage] = React.useState("");
    const [formState , setFormState] = React.useState({ date: '', time: '', address: '', city: '', zip: '', comment: ''})
    const [errorText, setErrorText] = React.useState('')
    const [date, setDate] = React.useState(new Date())    
    const [open, setOpen] = React.useState(false)

    function handleBlank(e) {
      if (!e.target.value.length) {
        setErrorMessage(`${e.target.name} is required.`);
      } else {
        setErrorMessage("");
      }
      if (!errorMessage) {
        setFormState({ ...formState, [e.target.name]: e.target.value });        
      }
    }      

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    const handleDateChange = (dateChoice) => {
      setFormState({
        ...formState,
        date: dateChoice.toDateString(),
      });
    };

    const handleTimeChange = (event) => {
      const { value } = event.target;
      setFormState({
        ...formState,
        time: value,
      });
    }

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      if(!formState.date || !formState.time || !formState.address || !formState.city || !formState.zip || !formState.comment){
         setErrorText('Missing required information fields!')
         return
      } else if(errorText) {
         return
      } else {
          const mutationResponse = await addFoodDonation({
              variables: {
                date: formState.date,
                time: formState.time,
                address: formState.address,
                city: formState.city,
                zip: formState.zip,
                comment: formState.comment
              }
            })
            console.log(mutationResponse)
      }

      }

  return (
    <div style={{textAlign: 'center'}}>
    <Form onSubmit={handleFormSubmit} >
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='blue'>Schedule a Pickup</Button>}
      size='small'
    >
    
      <Modal.Header>Select a Scheduled Pick Up Day</Modal.Header>
      <Modal.Content>
        <div className='calendar-ctn'>
            <ReactCalendar 
            onChange={(event) => {
              setDate(event);
              handleDateChange(date);
            }} value={date} />
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
            onChange={handleTimeChange}
             />
            </Menu>
            <p>
            We've found the following Address associated with your profile.
          </p>
            <Input value={user.address}
              name='Address'
             onChange={handleChange} 
             onBlur={handleBlank}/>

            <Input value={user.city} 
            name='City'
            onChange={handleChange} 
            onBlur={handleBlank}/>

            <Input value={user.zipcode}
            name='ZipCode'
            onChange={handleChange} 
            onBlur={handleBlank}/>

          <Header>Additional Comments</Header>
          <TextArea placeholder='Please add any additional' 
          style={{ resize: "none"}} 
          name='Comment'
          onChange={handleChange} 
          onBlur={handleBlank}/>
        </Modal.Description>
        <Button 
        type='submit' 
        content="Submit" 
        labelPosition='center' 
        floated='left' 
        icon='checkmark' 
        positive />
      </Modal.Content>
      <Modal.Actions style={{textAlign:'center'}}>
        <Button
          type='button'
          content="Close Modal"
      
          floated='right'
          icon='x'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
      {errorMessage && (
        <div>
        <p className="error-text" style={{margin: "0px 0px 10px 0px", border: "solid", backgroundColor: "#fa87b5", borderRadius: "5px", height: "40px", color: "red", fontWeight: "bold"}}>{errorMessage}</p>
      </div>
      )}
    </Modal>
    </Form>
    </div>
  )
}

export default ReactModal;