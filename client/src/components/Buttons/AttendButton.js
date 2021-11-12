import React from 'react';

const AttendButton = ({handleAttendeeUpdate, attended}) => {

    return (

    <div
    className="attend-button"
    onClick={handleAttendeeUpdate}
  >
    {attended ? (
      <span>Attend</span>
    ) : (
      <span>Unattend</span>
    )}
  </div>

    )
}

export default AttendButton;