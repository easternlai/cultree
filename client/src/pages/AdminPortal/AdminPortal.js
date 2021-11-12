import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import SettingsLogout from '../../components/SettingsLogout/SettingsLogout';



const AdminPortal = () => {
    return (

        <div className="layout-flat__body">
                <div className="heading-1__bold">Admin Portal</div>
                <div className="">
                    <div className=""><Link to="/admin/createuser" className="no-dec">+ Create User</Link></div>
                </div>
        </div>
    )
}

export default AdminPortal;