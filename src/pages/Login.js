import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL} from '../utils/Constant';
import { Col, Row } from 'react-bootstrap';

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
            <Form onSubmit={handleSubmit} className='h-100 d-flex flex-column align-items-center justify-content-center'>

                <Form.Group controlId="formBasicEmail" className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={handleChange} name = "email" value={formData.email} type="email" required></Form.Control>
                </Form.Group>

                <Form.Group controlId="fromBasicPassword" className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={handleChange} name = "password" value={formData.password} type="password" required></Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">Login</Button>

            </Form>
    )

}

export default Login