import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useState} from 'react';

const Login = () => {

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
        console.log('gg');
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