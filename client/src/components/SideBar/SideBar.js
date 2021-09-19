import React from "react";
import { connect } from "react-redux";
import { FiSettings } from "react-icons/fi";

import { signout } from "../../redux/user/userActions";

const SideBar = ({signout}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-top">
          <FiSettings className="sidebar-top__settings" />
          <div className="sidebar-top__icon" onClick={signout}>
            <span className="sidebar-top__icon__initial">E</span>
          </div>
        </div>
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
            </div>

        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

const mapDispatchtoProps = (dispatch) => ({
    signout: () => dispatch(signout()),
})

export default connect(mapStateToProps, mapDispatchtoProps)(SideBar);
