import { Badge, Dropdown, Toast, ToastContainer} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import {API_URL_COMPANY} from '../utils/Constant';
import moment from 'moment';

const NavBar = () => {
    const navigate = useNavigate();

    const API_URL_COMPANY_Var = API_URL_COMPANY();
    const [ remindersArr, setRemindersArr ] = useState([]);
    const [ remindersCount, setRemindersCount ] = useState(0);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("slug");
        navigate('/login');
    }

    async function fetchReminders(filter) {
        let response = await fetch(`${API_URL_COMPANY_Var}/reminders?` + new URLSearchParams(filter), {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const remindersRes = responseJson?.data?.reminders;
            const remindersCountRes = responseJson?.data?.count;
            setRemindersArr(remindersRes);
            setRemindersCount(remindersCountRes)
        }
        else if(status === 401){
            localStorage.removeItem("token");
            navigate('/login');
        }
        else{
            let error = responseJson?.data?.error
            error && alert(error);
        }
    }

    useEffect(() => {
        fetchReminders({
            reminderDate: moment().format('YYYY-MM-DD'),
            notification: true,
            'page': 1,
            'perPage': 5
        });
    }, []);

    return (
    <Navbar bg="light" expand="lg" sticky="top">
        
            <Navbar.Brand as={Link} to="/maintenance" className='ms-2'>Maintenance</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            
            <Navbar.Collapse id="basic-navbar-nav">
            
                <Nav className="me-auto">
                    
                    <Nav.Link as={Link} to="/">Home</Nav.Link>

                    <Dropdown>

                        <Dropdown.Toggle variant="link" bsPrefix="p-1">
                        
                            <Badge bg="warning" text="dark">
                                <IoIosNotifications/>
                                <Badge bg="secondary">{remindersCount > 0 ? remindersCount : ''}</Badge>
                            </Badge>

                        </Dropdown.Toggle>
                        
                        <Dropdown.Menu>
                            <Dropdown.Item>
                            
                            {remindersArr.map((reminder, index) =>{
                                return (
                                    <Toast>
                                        <Toast.Header closeButton={false}>
                                        <strong className="me-auto">{reminder.car?.name}</strong>
                                        <small className="text-muted">{new Date(reminder.reminderDate).toLocaleString()}</small>
                                        </Toast.Header>
                                        <Toast.Body>{reminder.description}</Toast.Body>
                                    </Toast>
                                )
                            })}

                            </Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>

                </Nav>

                <Nav className="me-auto" style={{display: 'contents'}}>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>

            </Navbar.Collapse>
        
    </Navbar>
    )
}

export default NavBar;