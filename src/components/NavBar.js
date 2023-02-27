import { Badge, Dropdown, Toast} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { CiDark } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import {API_URL_COMPANY} from '../utils/Constant';
import moment from 'moment';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../App';

const NavBar = () => {

    const themeColor = useContext(ThemeContext);
    const theme = useTheme();
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

                    {/* notification */}
                    <Dropdown>

                        <Dropdown.Toggle variant="link" bsPrefix="p-1">
                        
                            <Badge bg="warning" text="dark">
                                <IoIosNotifications/>
                                <Badge bg="secondary">{remindersCount > 0 ? remindersCount : ''}</Badge>
                            </Badge>

                        </Dropdown.Toggle>
                        
                        {remindersCount > 0 &&
                        <Dropdown.Menu>
                            <Dropdown.Item>
                            
                            {remindersArr.map((reminder, index) =>{
                                return (
                                    <Toast key={index}>
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
                        }

                    </Dropdown>

                    <IconButton sx={{ ml: 1 }} onClick={themeColor.toggleThemeColor} color="inherit">
                        {theme.palette.mode === 'light' ? <MdDarkMode /> : <CiDark style={{color:'black'}}/>}
                    </IconButton>

                </Nav>

                <Nav className="me-auto" style={{display: 'contents'}}>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>

            </Navbar.Collapse>
        
    </Navbar>
    )
}

export default NavBar;