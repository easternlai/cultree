import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { getAnnouncementsAction } from "../../redux/announcment.js/announcementActions";
import { createAnnouncementService, deleteAnnouncementService } from "../../services/announcementService";

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

  const [bulletin, setBulletin] = useState("");
  const [editAnnouncements, setEditAnnouncements] = useState(false);

  const handleDelete = (announcementId) => {
    deleteAnnouncementService(token, announcementId);
  };

  const handleCreateAnnouncement = () => {
    createAnnouncementService ( token, bulletin);
    setBulletin('');
    setEditAnnouncements(false);
  };
  if(fetching) {
    return <div></div>
  }
  return (
    <div className="layout-w-sidebar__sidebar announcements">
      <div className="heading-2__bold announcements--heading">
        Announcements
      </div>
      {user.admin === 5 && (editAnnouncements ? <span className="announcements--edit-announcements heading-4" onClick={()=> setEditAnnouncements(false)}>cancel</span>:  
      <span className="announcements--edit-announcements heading-4" onClick={()=> setEditAnnouncements(true)}>edit</span>
      )}

      {editAnnouncements &&
      <div className="announcements__create">
        <textarea
          className="announcements__create--input textarea-styles"
          placeholder="What would you like to announce?"
          value={bulletin}
          onChange={(e) => setBulletin(e.target.value)}
        />
        <div
          onClick={handleCreateAnnouncement}
          className={
            bulletin
              ? "announcements__create--button"
              : "announcements__create--button__disabled"
          }
        >
          {" "}
          Create
        </div>
      </div>}
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
              {user.admin === 5 && editAnnouncements &&  (
                <div
                  className="announcements__list__item--delete"
                  onClick={() => handleDelete(announcement._id)}
                >
                  delete
                </div>
              )}
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
