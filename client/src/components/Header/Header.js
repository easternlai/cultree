import React from 'react';
import Logo from '../Logo/Logo';
import SettingsLogout from '../SettingsLogout/SettingsLogout';

const Header = () => {

    return (
        <div className="header layout__header">
            <Logo />
            {/* <div className="header__search-box" placeholder="Search for activity..."/> */}
            <div />
            <SettingsLogout />
        </div>
    )
}



export default Header;