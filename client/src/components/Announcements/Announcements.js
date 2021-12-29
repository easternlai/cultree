import React, { useEffect } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { getAnnouncementsAction } from "../../redux/announcment.js/announcementActions";
import { deleteAnnouncementService } from "../../services/announcementService";

const Announcements = ({
  token,
  user,
  announcements,
  fetching,
  getAnnouncementsAction,
}) => {
  useEffect(() => {
    getAnnouncementsAction(token);
  }, []);
  
  const handleDelete = (announcementId) => {
    deleteAnnouncementService(token, announcementId);
  }

  return (
    <div className="layout-w-sidebar__sidebar announcements">
      <div className="heading-2__bold announcements--heading">
        Announcements
      </div>
      <div className="announcements__list">
        {!fetching &&
          announcements.map((announcement) => (
            <div className="announcements__list__item">
              <Moment
                format="MM/DD"
                className="announcements__list__item--date heading-4__bold"
              >
                {announcement.date}
              </Moment>
              <div className="announcements__list__item--text heading-4">
                {announcement.bulletin}
              </div>
              {user.admin === 5 && <div className="announcements__list__item--delete" onClick={() => handleDelete(announcement._id)}>delete</div>}
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  announcements: state.announcement.announcements,
  fetching: state.announcement.fetching,
  token: state.user.token,
  user: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  getAnnouncementsAction: (token) => dispatch(getAnnouncementsAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
