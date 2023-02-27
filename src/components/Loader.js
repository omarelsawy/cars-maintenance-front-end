import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', margin:2 }}>
      <CircularProgress />
    </Box>
  );
}

export default Loader