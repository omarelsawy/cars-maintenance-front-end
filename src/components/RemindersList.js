import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const RemindersList = ({ reminders }) => {

  return (
    <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Car</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reminders.map((reminder, index) => (
            <TableRow hover
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell>{reminder.description}</TableCell>
              <TableCell>{ new Date(reminder.reminderDate).toLocaleString() }</TableCell>
              <TableCell>{reminder.car?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RemindersList