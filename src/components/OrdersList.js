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
        <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
            <Table stickyHeader aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="fw-bold">#</TableCell>
                        <TableCell className="fw-bold">Car</TableCell>
                        <TableCell className="fw-bold">Address</TableCell>
                        <TableCell className="fw-bold">Start</TableCell>
                        <TableCell className="fw-bold">End</TableCell>
                        <TableCell className="fw-bold">Details</TableCell>
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