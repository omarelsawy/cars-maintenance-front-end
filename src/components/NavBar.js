import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }

    return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Maintenance</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default NavBar;