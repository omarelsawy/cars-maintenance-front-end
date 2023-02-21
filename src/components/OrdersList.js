import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
 
const OrdersList = ({ orders }) => {

    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/orders/${id}`);
    }

    return (
        
        <Table striped bordered hover className='mt-3'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Car</th>
                    <th>Address</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>

                {orders.map((order, index) =>{
                    return (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td>{ order.car?.name }</td>
                            <td>{ order.address }</td>
                            <td>{ new Date(order.start).toLocaleString() }</td>
                            <td>{ new Date(order.end).toLocaleString() }</td>
                            {<td><Button onClick={() => handleDetails(order._id)}>details</Button></td>}
                        </tr>
                    )
                })}
                
            </tbody>
        </Table>

    )
}

export default OrdersList
