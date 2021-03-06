import React from "react";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { BiStore, BiHomeAlt, BiPhotoAlbum, BiCard } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";

const NavBar = ({ admin }) => {
  const location = useLocation().pathname;
  return (
    <div className="layout__nav navbar">
      <ul className="navbar__list heading-2">
        <li className="navbar__list__item">
          <BiHomeAlt className="navbar__list__item--icon" />
          <span
            className={
              location == "/"
                ? "navbar__list__item--nav--active"
                : "navbar__list__item--nav"
            }
          >
            <Link to="/" className="no-dec">
              Home
            </Link>
          </span>
        </li>

        <li className="navbar__list__item">
          <BiStore className="navbar__list__item--icon" />
          <span
            className={
              location == "/store"
                ? "navbar__list__item--nav--active"
                : "navbar__list__item--nav"
            }
          >
            <Link to="/store" className="no-dec">
              Store
            </Link>
          </span>
        </li>
        <li className="navbar__list__item">
          <BiPhotoAlbum className="navbar__list__item--icon" />
          <span
            className={
              location.includes("/albums") || location.includes("/createalbum")
                ? "navbar__list__item--nav--active"
                : "navbar__list__item--nav"
            }
          >
            <Link to="/albums" className="no-dec">
              Photos
            </Link>
          </span>
        </li>
        {admin === 5 && (
          <li className="navbar__list__item">
            <BiCard className="navbar__list__item--icon" />
            <span
              className={
                location.includes("/admin")
                  ? "navbar__list__item--nav--active"
                  : "navbar__list__item--nav"
              }
            >
              <Link to="/admin" className="no-dec">
                Admin
              </Link>
            </span>
          </li>
        )}
        <li className="navbar__list__item">
          <GrUserAdmin className="navbar__list__item--icon" />
          <span
            className={
              location == "/createevent"
                ? "navbar__list__item--nav--active"
                : "navbar__list__item--nav"
            }
          >
            <Link to="/createevent" className="no-dec">
              Create Event
            </Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: state.user.currentUser.admin,
});

export default connect(mapStateToProps)(NavBar);
