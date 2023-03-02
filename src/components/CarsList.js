
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CarsList = ({ cars }) => {

    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/cars/${id}`);
    }

  return (
    <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="fw-bold">#</TableCell>
            <TableCell className="fw-bold">Car</TableCell>
            <TableCell className="fw-bold">Maintenance</TableCell>
            <TableCell className="fw-bold">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cars.map((car, index) => (
            <TableRow hover
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {index+1}
              </TableCell>
              <TableCell>{car.name}</TableCell>
              <TableCell>{ car.maintenanceCount }</TableCell>
              <TableCell><Button onClick={() => handleDetails(car._id)}>details</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CarsList