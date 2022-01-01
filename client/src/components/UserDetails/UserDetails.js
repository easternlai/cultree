import React, { useState } from "react";
import { editUserService } from "../../services/adminService";

const UserDetails = ({ user, token, dispatch }) => {
  const [edit, setEdit] = useState(false);
  const [admin, setAdmin] = useState(user.admin);
  const [balance, setBalance] = useState(user.balance);

  const handleCancel = () => {
    setBalance(user.balance);
    setAdmin(user.admin);
    setEdit(false);
  };

  const handleSave = async() => {
    setEdit(false);
    const acknowledgement = await editUserService(token, user._id, balance, admin);
    console.log(acknowledgement.updatedUser);
    dispatch({type: 'EDIT_USER', payload: {userId: user._id, balance, admin}})
  };


  return (
    <div id={user._id} className="manage-users__user-list">
      <div className="heading-3 manage-users__user-list__item">
        {user.fullName}
      </div>
      <div className="heading-3 manage-users__user-list__item">
        {user.email}
      </div>
      {
        <div className="heading-3 manage-users__user-list__item">
          {edit ? (
            <input className="heading-3 manage-users__user-list__item--input" onChange={(e) => setBalance(parseInt(e.target.value))} value={balance} />
          ) : (
            <div>{user.balance}</div>
          )}
        </div>
      }
      <div className="heading-3 manage-users__user-list__item">
        {edit ? (
          <select className="heading-3 manage-users__user-list__item--select" onChange={(e)=> setAdmin(parseInt(e.target.value))}>
            <option value="1">user</option>
            <option value="5" selected={user.admin === 5 ? true : false}>
              admin
            </option>
          </select>
        ) : (
          <div>{user.admin === 5 ? "admin" : "user"}</div>
        )}
      </div>
      <div className="heading-3 manage-users__user-list__item ">
        {edit && (
          <div
            onClick={handleCancel}
            className="heading-5 manage-users__user-list__item--cancel"
          >
            cancel
          </div>
        )}
        {edit && (
          <div
            onClick={handleSave}
            className="heading-5 manage-users__user-list__item--save"
          >
            save
          </div>
        )}
        {!edit && (
          <div
            onClick={() => setEdit(!edit)}
            className="heading-5 manage-users__user-list__item--edit"
          >
            edit
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
