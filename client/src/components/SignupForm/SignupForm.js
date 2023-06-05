import React, { useState }  from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';


const SignupForm = (props) => {
        const [formState, setFormState] = useState({ email: '', password: ''});
        const [addUser] = useMutation(ADD_USER);

        const handleFormSubmit = async (event) => {
            event.preventDefault();
            const mutationResponse = await addUser({
                variables: {
                  name: formState.name,
                  email: formState.email,
                  password: formState.password,                  
                  address: formState.address,
                  city: formState.city,
                  zipcode: formState.zipcode,
                  phone: formState.phone
                },
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
            };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

return ( 
  <Form onSubmit={handleFormSubmit} size="huge">
    <Form.Field required>
      <label style={{ margin: '0px 0px 10px 5px'}}>Name</label>
      <input 
      placeholder='Name' 
      name="name"
      id="name"
      onChange={handleChange}
      />
    </Form.Field>
    <Form.Field required>
      <label style={{ margin: '0px 0px 10px 5px'}}>Email</label>
      <input 
      placeholder='example@email.com' 
      name="email"
      type="email"
      id="email"
      onChange={handleChange}
      />
    </Form.Field>
    <Form.Field>
      <label style={{ margin: '0px 0px 10px 5px'}}>Address</label>
      <input 
      placeholder='Street Address' 
      name="address"
      id="address"
      onChange={handleChange}
      />
    </Form.Field>
    <Form.Field>
      <label style={{ margin: '0px 0px 10px 5px'}}>City</label>
      <input 
      placeholder='City' 
      name="city"
      id="city"
      onChange={handleChange}
      />
    </Form.Field>
    <Form.Field>
      <label style={{ margin: '0px 0px 10px 5px'}}>Zip Code</label>
      <input 
      placeholder='Zip Code' 
      name="zipcode"
      id="zipcode"
      onChange={handleChange}
      />
    </Form.Field>
    <Form.Field required>
      <label style={{ margin: '0px 0px 10px 5px'}}>Password</label>
      <input 
      placeholder='**********' 
      name="password"
      type="password"
      id="password"
      onChange={handleChange}
      />
    </Form.Field>
    <Form.Field required>
      <label style={{ margin: '0px 0px 10px 5px'}}>Phone Number</label>
      <input 
      placeholder='###-###-####' 
      name="phone"
      id="phone"
      onChange={handleChange}
      />
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
    )
}


export default SignupForm;