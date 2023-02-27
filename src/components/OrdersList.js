import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const OrdersList = ({ orders }) => {

    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/orders/${id}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Car</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Start</TableCell>
                        <TableCell>End</TableCell>
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order, index) => (
                        <TableRow hover
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell>{order.car?.name}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell>{ order.start ? new Date(order.start).toLocaleString() : '' }</TableCell>
                            <TableCell>{ order.end ? new Date(order.end).toLocaleString() : '' }</TableCell>
                            <TableCell><Button onClick={() => handleDetails(order._id)}>details</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrdersList