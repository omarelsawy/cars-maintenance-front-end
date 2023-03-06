import { Button } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const Maintenance = ({ maintenanceArr }) => {

    const navigate = useNavigate();

    const handleDetails = (id) => {
        navigate(`/maintenance/${id}`);
    }

  return (
    <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="fw-bold">#</TableCell>
            <TableCell className="fw-bold">Date</TableCell>
            <TableCell className="fw-bold">Car</TableCell>
            <TableCell className="fw-bold">Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maintenanceArr.map((maintenance, index) => (
            <TableRow hover
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell>{ new Date(maintenance.maintenanceDate).toLocaleDateString() }</TableCell>
              <TableCell>{ maintenance.car?.name }</TableCell>
              <TableCell><Button onClick={() => handleDetails(maintenance._id)}>details</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Maintenance