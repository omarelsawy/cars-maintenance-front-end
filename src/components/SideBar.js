import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart } from 'react-icons/fa';
import {Link} from 'react-router-dom';

const SideBar = () => {
    return (

        <ProSidebar breakPoint='xl' toggled={true} className='position-fixed'>
        <Menu iconShape="square">
            <MenuItem icon={<FaGem />}>
                Dashboard
                <Link to="/" />
            </MenuItem>
            
            <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>
                Maintenance
                <Link to="/" />
            </MenuItem>

            <MenuItem>
                Cars
                <Link to="/cars" />
            </MenuItem>
            </SubMenu>
        </Menu>
        </ProSidebar>

    )
}

export default SideBar