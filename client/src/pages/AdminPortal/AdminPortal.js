import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import SettingsLogout from '../../components/SettingsLogout/SettingsLogout';



const AdminPortal = () => {
    return (

        <div className="body-container">
            <NavBar />
            <div className="admin">
                <SettingsLogout/>
                <div className="heading-1__bold">Admin Portal</div>
                <div className="admin-options">
                    <div className="admin-options__item"><Link to="/admin/createuser" className="no-dec">+ Create User</Link></div>
                </div>
            </div>
        </div>
    )
}

export default AdminPortal;