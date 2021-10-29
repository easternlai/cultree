import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import SettingsLogout from '../../components/SettingsLogout/SettingsLogout';
import { createUser } from '../../services/adminService';

const CreateUser = ({token}) => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [department, setDepartment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [admin, setAdmin] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        createUser(fullName, email,username,password,department,startDate,admin, token);
        setFullName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setDepartment('');
        setStartDate('');
        setAdmin(false);
    }

    return (

        <div className="body-container">
            <NavBar />
            <div className="admin">
                <SettingsLogout />
                <div className="heading-1__bold"><span>Admin Portal <span className="heading-super">></span> Create User</span></div>


                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="admin-form__item">
                        <label for="fullName" className="admin-form__item__label">Full Name</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="fullName"
                            className="admin-form__item__input"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="admin-form__item">
                        <label for="email" className="admin-form__item__label">Email Address</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="email"
                            value={email}
                            className="admin-form__item__input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="admin-form__item">
                        <label for="username" className="admin-form__item__label">Username</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="username"
                            value={username}
                            className="admin-form__item__input"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="admin-form__item">
                        <label for="department" className="admin-form__item__label">Department</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="department"
                            value={department}
                            className="admin-form__item__input"
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <div className="admin-form__item">
                        <label for="startDate" className="admin-form__item__label">Start Date</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="startDate"
                            value={startDate}
                            className="admin-form__item__input"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="admin-form__item">
                        <label for="password" className="admin-form__item__label">Password</label>
                        <input
                            type="password"
                            maxLength="30"
                            name="password"
                            value={password}
                            className="admin-form__item__input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="admin-form__item">
                        <label for="admin" className="admin-form__item__label">Administrator</label>
                        <input
                            type="checkbox"
                            maxLength="30"
                            name="admin"
                            className="admin-form__item__checkbox"
                            value={admin}
                            onChange={(e) =>setAdmin(!admin)}
                        />
                    </div>


                    <input type="submit" className="admin-form__button" value="Add User" />

                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.token
});

export default connect(mapStateToProps)(CreateUser);