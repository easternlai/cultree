import React, { useState, useEffect, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { deleteComment } from "../../services/eventServices";

const CommentOptions = ({ token, commentId, dispatch }) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const handleOptionsClick = () => setIsActive(!isActive);

  useEffect(() => {
    const pageClickEvent = (e) => {
      console.log(dropdownRef);
      if(dropdownRef.current !== null && !dropdownRef.current.contains(e.target) ){
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }

    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  },[isActive]);

  const handleAbuse = ()=>{
    setIsActive(!isActive);
  }

  const handleDelete = () => {
    deleteComment(commentId, token);
    dispatch({ type: "DELETE_COMMENT", payload: { commentId } });
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
          <li onClick={handleAbuse}>Report abuse</li>
          {token && <li onClick={handleDelete}>Delete</li>}
        </ul>
      </nav>
    </div>
  );
};

export default CommentOptions;
