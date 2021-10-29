import React from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { BiStore, BiHomeAlt, BiPhotoAlbum, BiCard } from 'react-icons/bi';
import { GrUserAdmin } from 'react-icons/gr';

const NavBar = ({ admin }) => {
    const location = useLocation().pathname;
    return (
        <div className="navbar">
            <div className="navbar-wrapper">
                <div className="navbar-logo heading-logo"><span className="heading-logo__first">B</span><span className="heading-logo__second">Z</span></div>
                <ul className="navbar-list heading-2">
                    <li className="navbar-list__item">
                        <BiHomeAlt className="navbar-list__item__icon" />
                        <span className={location=='/'?'navbar-list__item__nav__active':'navbar-list__item__nav'}><Link to='/' className="no-dec">Home</Link></span>
                    </li>
                    <li className="navbar-list__item">
                        <BiStore className="navbar-list__item__icon" />
                        <span className={location=='/store'?'navbar-list__item__nav__active':'navbar-list__item__nav'}>Store</span>
                    </li>
                    <li className="navbar-list__item">
                        <BiPhotoAlbum className="navbar-list__item__icon" />
                        <span className={location=='/photos'?'navbar-list__item__nav__active':'navbar-list__item__nav'}>Photos</span>
                    </li>
                    {admin && (
                        <li className="navbar-list__item">
                            <BiCard className="navbar-list__item__icon" />
                            <span className={location=='/admin'?'navbar-list__item__nav__active':'navbar-list__item__nav'}><Link to='/admin' className="no-dec">Admin</Link></span>
                        </li>
                    )
                    }
                    <li className="navbar-list__item">
                        <GrUserAdmin className="navbar-list__item__icon" />
                        <span className="navbar-list__item__nav">Create Event</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    admin: state.user.currentUser.admin
});

export default connect(mapStateToProps)(NavBar);