import React, { useState } from 'react';
import { connect } from 'react-redux';
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


            <div className="create-user">
                <div className="heading-2__bold"><span>Admin Portal</span ><span className="heading-1__bold"> >> </span><span>Create User</span></div>


                <form onSubmit={handleSubmit} className="create-user__form">
                    <div className="create-user__form__item">
                        <label for="fullName" className="create-user__form__item--label">Full Name</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="fullName"
                            className="create-user__form__item--input"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="create-user__form__item">
                        <label for="email" className="create-user__form__item--label">Email Address</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="email"
                            value={email}
                            className="create-user__form__item--input"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="create-user__form__item">
                        <label for="username" className="create-user__form__item--label">Username</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="username"
                            value={username}
                            className="create-user__form__item--input"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="create-user__form__item">
                        <label for="department" className="create-user__form__item--label">Department</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="department"
                            value={department}
                            className="create-user__form__item--input"
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <div className="create-user__form__item">
                        <label for="startDate" className="create-user__form__item--label">Start Date</label>
                        <input
                            type="text"
                            maxLength="30"
                            name="startDate"
                            value={startDate}
                            className="create-user__form__item--input"
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="create-user__form__item">
                        <label for="password" className="create-user__form__item--label">Password</label>
                        <input
                            type="password"
                            maxLength="30"
                            name="password"
                            value={password}
                            className="create-user__form__item--input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="create-user__form__item">
                        <label for="admin" className="create-user__form__item--label">Administrator</label>
                        <input
                            type="checkbox"
                            maxLength="30"
                            name="admin"
                            className="create-user__form__item--check-box"
                            value={admin}
                            onChange={(e) =>setAdmin(!admin)}
                        />
                    </div>


                    <input type="submit" className="create-user__form--button" value="Add User" />

                </form>
            </div>
    )
}

const mapStateToProps = (state) => ({
    token: state.user.token
});

export default connect(mapStateToProps)(CreateUser);