import React from 'react'
import { ADD_FOOD_DONATION } from '../../utils/mutations';
import { GET_USER } from '../../utils/queries'
import { useQuery, useMutation } from '@apollo/client'
import { Calendar as ReactCalendar } from 'react-calendar'
import { Button, Header, Modal, Menu, Input, Form, TextArea } from 'semantic-ui-react'


function ReactModal() {

    const { data } = useQuery(GET_USER);
    const [addFoodDonation] = useMutation(ADD_FOOD_DONATION);
    const user = data?.getUser || {};
    const [errorMessage, setErrorMessage] = React.useState("");
    const [formState , setFormState] = React.useState({ date: '', time: '', address: '', city: '', zip: '', comment: ''})
    const [date, setDate] = React.useState(new Date())    
    const [open, setOpen] = React.useState(false)
    const [badDate, setBadDate] = React.useState(false);

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
      console.log(formState)
    };

    //takes content from the react calendar and stringifies and adds it to schedule form, then it checks if the date has already passed, if so it creates a bad Date state which wont allow the form to submit
    const handleDateChange = (dateChoice) => {
      setFormState({
        ...formState,
        date: dateChoice.toDateString(),
      });
      setErrorMessage('');
      if(Date.now() > dateChoice){
        setErrorMessage('That date has already passed, please select another date.');
        setBadDate(true);
        return
      }else{
        setBadDate(false);
      }
      
      console.log(formState)
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();
     if(!formState.date || !formState.time || !formState.address || !formState.city || !formState.zip || !formState.comment){
         setErrorMessage('Missing required information fields!')
         return
      }else if(badDate){
        setErrorMessage('That date has already passed, please select another date.');
        return
      }
      else {
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
            //closes modal window when response is good then resets formstate for scheduler
            setOpen(false)
            setFormState({ date: '', time: '', address: '', city: '', zip: '', comment: ''})
            console.log(mutationResponse);
      }

      }

  return (
    <div>
    <Modal
      as={Form}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true) }
      open={open}
      trigger={<Button color='blue' >Schedule Pick Up</Button>}
      size='small'
      onSubmit={handleFormSubmit}
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
        <div className='text-center' style={{fontSize: "2em", color: "Green", marginTop: "5px"}}>
            Selected date: {date.toDateString()}
        </div>
        <Modal.Description>
          <Header>Select A Pick Up Time</Header>
          <Menu compact>
          <Input placeholder='Time'
              name='time'
             onChange={handleChange} 
             onBlur={handleBlank}/>
            </Menu>
            <p style={{marginTop: "5px"}}>
            *We've found the following Address associated with your profile.
          </p>
            <Input placeholder={user.address}
              name='address'
             onChange={handleChange} 
             onBlur={handleBlank}/>
            <Input placeholder={user.city} 
            name='city'
            onChange={handleChange} 
            onBlur={handleBlank}/>
            <Input placeholder={user.zipcode}
            name='zip'
            onChange={handleChange} 
            onBlur={handleBlank}/>
          <Header>Additional Comments</Header>
          <TextArea placeholder='Please add any additional information' 
          style={{ resize: "none"}} 
          name='comment'
          onChange={handleChange} 
          onBlur={handleBlank}/>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          type='submit'
          content="Submit"
          labelPosition='center'
          floated='right'
          icon='check'
          positive
        />
         <Button
          type='button'
          content="Close"
          labelPosition='center'
          floated='right'
          icon='x'
          onClick={() => setOpen(false)}
          negative
        />
      </Modal.Actions>
      {errorMessage && (
        <div>
        <p className="error-text" style={{margin: "40px 0px 10px 0px", border: "solid", backgroundColor: "#fa87b5", borderRadius: "5px", height: "40px", color: "red", fontWeight: "bold"}}>{errorMessage}</p>
      </div>
      )}
    </Modal>
    </div>
  )
}

export default ReactModal;