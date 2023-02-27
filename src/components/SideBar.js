import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FcInTransit, FcWorkflow, FcVoicePresentation, FcServices } from 'react-icons/fc';
import {Link} from 'react-router-dom';

const SideBar = () => {
    return (

        <ProSidebar className='sidebar'>
        <Menu iconShape="square">
            
            <MenuItem active={window.location.pathname === "/maintenance"} icon={<FcServices />}>
                Maintenance
                <Link to="/maintenance" />
            </MenuItem>

            <MenuItem active={window.location.pathname === "/cars"} icon={<FcInTransit />}>
                Cars
                <Link to="/cars" />
            </MenuItem>

            <MenuItem active={window.location.pathname === "/orders"} icon={<FcWorkflow />}>
                Orders
                <Link to="/orders" />
            </MenuItem>

            <MenuItem active={window.location.pathname === "/reminders"} icon={<FcVoicePresentation />}>
                Reminders
                <Link to="/reminders" />
            </MenuItem>

        </Menu>
        </ProSidebar>

    )
}

export default SideBar