import { useEffect, useState } from "react";
import { InputGroup, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { API_URL_COMPANY } from '../utils/Constant';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import Paginator from '../components/Paginator';
import { Button } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Loader from "../components/Loader";

const SingleCar = () => {

    const API_URL_COMPANY_Var = API_URL_COMPANY();

    const params = useParams();
    const navigate = useNavigate();

    const [ enableLoader, setEnableLoader ] = useState(true);

    const [car, setCar] = useState({});
    const [maintenanceCount, setMaintenanceCount] = useState(0);
    const [formData, setFormData] = useState({
        dateFrom: "", dateTo: ""
    });
    const [page, setPage] = useState(1);

    const perPage = 10;
    let pagesCount = Math.ceil(maintenanceCount / perPage)

    async function fetchCar(filter) {
        let response = await fetch(`${API_URL_COMPANY_Var}/cars/${params.id}?` + new URLSearchParams(filter), {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });

        let responseJson = await response.json();
        let status = response.status;

        setEnableLoader(false)

        if (status === 200) {
            const carRes = responseJson?.data?.car;
            const maintenanceCountRes = responseJson?.data?.maintenanceCount;
            setCar(carRes);
            setMaintenanceCount(maintenanceCountRes);
        }
        else if (status === 401) {
            localStorage.removeItem("token");
            navigate('/login');
        }
        else {
            let error = responseJson?.data?.error
            error && alert(error);
        }
    }

    useEffect(() => {
        fetchCar({
            ...formData,
            'page': page,
            'perPage': perPage
        });
    }, [formData, page]);

    const handleDetails = (id) => {
        navigate(`/maintenance/${id}`);
    }

    const handleDateChange = (e) => {
        const { name, value } = e.target

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

                <Row className="p-0">
                    <Col>
                        <Link to={`/maintenance/add?carId=${car._id}&label=${car.name}`}>
                            <Button>
                                add Maintenance
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <Paper
                    sx={{
                        p: 2,
                        //margin: 'auto',
                        marginTop: 1,
                        marginBottom: 2,
                        maxWidth: 500,
                        flexGrow: 1,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    }}
                >
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        {car.name}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Type: {car.type}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Sub Type: {car.subType}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Color: {car.color}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Model: {car.model}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Number Plate: {car.numberPlate}
                                    </Typography>
                                </Grid>

                            </Grid>

                        </Grid>
                    </Grid>
                </Paper>

                <Row className="p-0">
                    <Col>
                        <InputGroup>
                            <InputGroup.Text id="from-date">
                                <FaSearch />
                                FromDate
                            </InputGroup.Text>
                            <Form.Control type="date" name='dateFrom' onChange={handleDateChange} value={formData.dateFrom} aria-describedby="from-date" />
                        </InputGroup>
                    </Col>

                    <Col className='ms-2'>
                        <InputGroup>
                            <InputGroup.Text id="to-date">
                                <FaSearch />
                                ToDate
                            </InputGroup.Text>
                            <Form.Control type="date" name='dateTo' onChange={handleDateChange} value={formData.dateTo} aria-describedby="from-date" />
                        </InputGroup>
                    </Col>
                </Row>

                {
                    car?.maintenance?.length ?

                        <Row>
                            <div className='mt-3 p-0'><span className='fw-bold'>maintenance count: {maintenanceCount}</span></div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {car?.maintenance.map((maintenance, index) => (
                                            <TableRow hover
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>{new Date(maintenance.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell>{maintenance.description}</TableCell>
                                                <TableCell><Button onClick={() => handleDetails(maintenance._id)}>details</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div>
                                <Paginator pagesCount={pagesCount} handleChangePage={handleChangePage} />
                            </div>
                        </Row>

                        : <div className='mt-3'>No maintenance right now</div>
                }

            </Row>

        </>
    );

}

export default SingleCar