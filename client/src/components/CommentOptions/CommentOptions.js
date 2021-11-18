import React, { useState, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { deleteComment } from "../../services/eventServices";

const CommentOptions = ({ token, commentId, dispatch }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const handleOptionsClick = () => setIsActive(!isActive);

  const handleDelete = () => {
    deleteComment(commentId, token);
    dispatch({type: "DELETE_COMMENT", payload: {commentId}});
    setIsActive(false);
  };
  return (
    <div className="event-page-options">
      <BiDotsVerticalRounded
        className="event-page-options--button heading-2"
        onClick={handleOptionsClick}
      />
      <nav
        ref={dropdownRef}
        className={`event-page-options__drop-down ${
          isActive ? `active` : "inactive"
        }`}
      >
        <ul>
          <li>Report abuse</li>
          {token && <li onClick={handleDelete}>Delete</li>}
        </ul>
      </nav>
    </div>
  );
};

export default CommentOptions;
