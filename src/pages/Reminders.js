import NavBar from '../components/NavBar';
import { Col, Button, InputGroup, Row, Form } from "react-bootstrap";
import SideBar from '../components/SideBar';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {API_URL_COMPANY} from '../utils/Constant';
import Paginator from '../components/Paginator';
import { FaSearch } from 'react-icons/fa';
import RemindersList from '../components/RemindersList';
import moment from 'moment';
import Loader from '../components/Loader';

const Reminders = () => {

    const API_URL_COMPANY_Var = API_URL_COMPANY();
    const navigate = useNavigate();

    const [ enableLoader, setEnableLoader ] = useState(true);

    const [ cars, setCars ] = useState([]);
    const [ remindersArr, setRemindersArr ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ remindersCount, setRemindersCount ] = useState(0);
    const [ carSelected, setCarSelected ] = useState();
    const [ formData, setFormData ] = useState({
        reminderDate: ""
    });

    const perPage = 10;
    let pagesCount = Math.ceil(remindersCount/perPage)

    async function fetchCars() {
        let response = await fetch(`${API_URL_COMPANY_Var}/cars`,{
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });

        let responseJson = await response.json();
        let status = response.status;

        if(status === 200){
            const carsRes = responseJson?.data?.cars;
            setCars(carsRes);
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

    async function fetchReminders(filter) {
        let response = await fetch(`${API_URL_COMPANY_Var}/reminders?` + new URLSearchParams(filter), {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        });
        let responseJson = await response.json();
        let status = response.status;

        setEnableLoader(false)

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
        fetchCars();
    }, []);

    useEffect(() => {
        let filter = {
            ...formData,
            'page': page,
            'perPage': perPage
        }

        if(carSelected){
            filter.carId = carSelected.value
        }

        fetchReminders(filter);
    }, [page, carSelected, formData]);

    const handleCarChange = (selected) => {
        setCarSelected(selected)
    }

    const handleChange = (event) => {

        const { name, value } = event.target

        setFormData(prevFormDate => {
            return { 
                ...prevFormDate,
                [name]: value
            };
        })

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <NavBar />
            <SideBar />
            <Row className='m-3 float-end' style={{ width: '80%' }}>
            {enableLoader && <Loader />}

                <Row>
                    <Col>
                        <Link to={'/reminders/add'}>
                            <Button>
                                Add Reminder
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Row className='mt-3'>

                    <Col sm='6'>
                        <InputGroup>
                            <InputGroup.Text id="from-date">
                                <FaSearch />
                                Date
                            </InputGroup.Text>
                            <Form.Control type="date" min={ moment().format('YYYY-MM-DD') }
                                name='reminderDate' onChange={handleChange} value={formData.reminderDate}
                            />
                        </InputGroup>
                    </Col>

                    <Col style={{color:'black'}}>
                        <Select
                            onChange={handleCarChange}
                            isClearable={true}
                            options={cars?.map(car => {
                                return { 'value': car._id, 'label': car.name }
                            })}
                            value={carSelected}
                        />
                    </Col>

                </Row>

                <Row>

                    <Col>
                        {remindersArr.length > 0 ?
                            <>
                                <div className='mt-3'><span className='fw-bold'>reminders count: {remindersCount}</span></div>
                                <RemindersList reminders={remindersArr}/>
                                <Paginator pagesCount={pagesCount} handleChangePage={handleChangePage} />
                            </>
                            : <div className='mt-3'>No reminders right now</div>
                        }
                    </Col>
                </Row>

            </Row>
        </>
    )
}

export default Reminders
