import React from 'react';

import {BiStore, BiHomeAlt, BiPhotoAlbum, BiCard} from 'react-icons/bi';
import {GrUserAdmin} from 'react-icons/gr'

const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-wrapper">
            <div className="navbar-logo heading-logo"><span className="heading-logo__first">B</span><span className="heading-logo__second">Z</span></div>
            <ul className="navbar-list heading-2">
                <li className="navbar-list__item">
                    <BiHomeAlt className="navbar-list__item__icon"/>
                    <span className="navbar-list__item__nav">Home</span>
                </li>
                <li className="navbar-list__item">
                    <BiStore className="navbar-list__item__icon"/>
                    <span className="navbar-list__item__nav">Store</span>
                </li>
                <li className="navbar-list__item">
                    <BiPhotoAlbum className="navbar-list__item__icon"/>
                    <span className="navbar-list__item__nav">Photos</span>
                </li>
                <li className="navbar-list__item">
                    <BiCard className="navbar-list__item__icon"/>
                    <span className="navbar-list__item__nav">What's New</span>
                </li>
                <li className="navbar-list__item">
                    <GrUserAdmin className="navbar-list__item__icon"/>
                    <span className="navbar-list__item__nav">Admin</span>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default NavBar;
