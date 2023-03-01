import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { FcInTransit, FcServices, FcVoicePresentation, FcWorkflow } from 'react-icons/fc';
import { Button } from '@mui/material';
import { Badge, Dropdown, Toast} from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { CiDark } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import {API_URL_COMPANY} from '../utils/Constant';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../App';

export const drawerWidth = 240;

const Layout = () => {

  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>
      
      <ListItem disablePadding component={Link} to="/maintenance" style={{color:'inherit'}}>
        <ListItemButton>
          <ListItemIcon>
            <FcServices />
          </ListItemIcon>
          <ListItemText primary='Maintenance' />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding component={Link} to="/cars" style={{color:'inherit'}}>
        <ListItemButton>
          <ListItemIcon>
            <FcInTransit />
          </ListItemIcon>
          <ListItemText primary='Cars' />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding component={Link} to="/reminders" style={{color:'inherit'}}>
        <ListItemButton>
          <ListItemIcon>
            <FcVoicePresentation />
          </ListItemIcon>
          <ListItemText primary='Reminders' />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding component={Link} to="/orders" style={{color:'inherit'}}>
        <ListItemButton>
          <ListItemIcon>
            <FcWorkflow />
          </ListItemIcon>
          <ListItemText primary='Orders' />
        </ListItemButton>
      </ListItem>

      </List>
    
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Cars
          </Typography>
          
          {/* theme */}
          <IconButton sx={{ ml: 1 }} onClick={themeColor.toggleThemeColor} color="inherit">
              {theme.palette.mode === 'light' ? <MdDarkMode /> : <CiDark style={{color:'black'}}/>}
          </IconButton>

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
          <Button color="inherit" onClick={handleLogout}>logout</Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      
    </>
  );
}

export default Layout;