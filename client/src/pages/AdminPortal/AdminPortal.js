import React from 'react';
import { Link } from 'react-router-dom';




const AdminPortal = () => {
    return (

        <div className="layout-flat__body admin">
                <div className="heading-2__bold">Admin Portal</div>
                <div className="admin__options">
                    <div className="admin__options--items heading-2"><Link to="/admin/createuser" className="no-dec">+ Create User</Link></div>
                </div>
        </div>
    )
}

export default AdminPortal;