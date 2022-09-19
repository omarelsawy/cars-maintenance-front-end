import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if(token){
            navigate('/home');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        let resToken = 'value';
        localStorage.setItem("token", resToken);
        navigate('/home');
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