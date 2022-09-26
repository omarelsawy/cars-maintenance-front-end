import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../utils/Constant';

const Login = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            navigate('/');
        }
    });

    const [ formData, setFormData ] = useState(
        { email: "", password: "" }
    );

    const handleChange = (event) => {

        const { name, value } = event.target

        setFormData(prevFormDate => {
            return { 
                ...prevFormDate,
                [name]: value
            };
        })

    }    

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await fetch(`${API_URL}/users/get-token`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
             "email": formData.email,
             "password": formData.password
            })
        });

        let status = response.status;
        let responseJson = await response.json();
        const token = responseJson?.data?.token;

        if(status === 200 && token){
            localStorage.setItem("token", token);
            navigate('/');
        }
        else{
            let error = responseJson?.data?.error
            error ? alert(error) : alert('not authorized')
        }
        
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleChange} name = "email" value={formData.email} type="email" required></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="fromBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} name = "password" value={formData.password} type="password" required></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">Login</Button>

            </Form>
        </Container>
    )

}

export default Login