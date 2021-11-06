import React from "react";

import SettingsLogout from "../SettingsLogout/SettingsLogout";

const SideBar = () => {
  return (
    <div className="sidebar">
      
        <SettingsLogout />
        <div className="sidebar-announcements">
            <div className="heading-1 sidebar-announcements__heading">Announcements</div>
            <div className="sidebar-announcements__list">
                <div className="sidebar-announcements__list__item">
                    <div className="sidebar-announcements__list__item__date">10-2-2021</div>
                    <div className="sidebar-announcements__list__item__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget mollis lacus. Vivamus scelerisque dui.</div>
                </div>
                <div className="sidebar-announcements__list__item">
                    <div className="sidebar-announcements__list__item__date">10-1-2021</div>
                    <div className="sidebar-announcements__list__item__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In leo arcu, consequat eu cursus sit amet, iaculis nec quam. Nam metus dui, mollis sit amet luctus ut, pretium id lacus.</div>
                </div>
                <div className="sidebar-announcements__list__item">
                    <div className="sidebar-announcements__list__item__date">10-2-2021</div>
                    <div className="sidebar-announcements__list__item__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget mollis lacus. Vivamus scelerisque dui.</div>
                </div>
            

            </div>
        </div>
    </div>
  );
};



export default SideBar;
