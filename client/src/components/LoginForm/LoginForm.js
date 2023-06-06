import React, { useState }  from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { LOGIN } from '../../utils/mutations';

const LoginForm = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
    } catch (e) {
        console.log(e);
    }
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
            <label style={{ margin: '0px 0px 10px 5px'}}>Email</label>
            <input 
            placeholder='example@email.com' 
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            />
        </Form.Field>
        <Form.Field required>
            <label style={{ margin: '0px 0px 10px 5px'}}>Password</label>
            <input 
            placeholder='**********' 
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            />
        </Form.Field>
        <Button type='submit'>Submit</Button>
        </Form>
        )
}

export default LoginForm;