import React, { useState }  from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { LOGIN } from '../../utils/mutations';
import { validateEmail } from '../../utils/helpers';

const LoginForm = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState("");
    const [login] = useMutation(LOGIN);
    
    //this function checks the form when the email input is interacted with and uses the regex from validate email to compare if the email input is valid if not it generates and error message
    function handleEmail(e) {
		if (e.target.name === "email") {
			const isValid = validateEmail(e.target.value);
			if (!isValid) {
				setErrorMessage("Your email is invalid.");
			} else {
				if (!e.target.value.length) {
					setErrorMessage(`${e.target.name} is required.`);
				} else {
					setErrorMessage("");
				}
			}
		}
		if (!errorMessage) {
			setFormState({ ...formState, [e.target.name]: e.target.value });
		}
	}

    //this generates an error if the password field is left blank 
    function handleBlank(e) {
		if (!e.target.value.length) {
				setErrorMessage(`${e.target.id} is required.`);
			} else {
				setErrorMessage("");
			}
		if (!errorMessage) {
			setFormState({ ...formState, [e.target.name]: e.target.value });
		}
	}

    //this log the user in if the input fields if the credentials are correct and provides a login token
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

    //updates the formstate when the user interacts with the fields
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
            onBlur={handleEmail}
            />
        </Form.Field>
        <Form.Field required>
            <label style={{ margin: '0px 0px 10px 5px'}}>Password</label>
            <input 
            placeholder='**********' 
            name="password"
            type="password"
            id="Password"
            onChange={handleChange}
            onBlur={handleBlank}
            />
        </Form.Field>
        {errorMessage && (
						<div>
							<p className="error-text" style={{margin: "0px 0px 10px 0px", border: "solid", backgroundColor: "#fa87b5", borderRadius: "5px", height: "40px", color: "red", fontWeight: "bold"}}>{errorMessage}</p>
						</div>
					)}
        
        <Button color='blue' type='submit'>Submit</Button>
        </Form>
        )
}

export default LoginForm;