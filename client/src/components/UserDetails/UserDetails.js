import React, {useState} from "react";

const UserDetails = ({ user, dispatch }) => {
    const [edit, setEdit] = useState(false);

    const handleCancel = () => {
        setEdit(false);
    }

  return (
    <div id={user._id} className="manage-users__user-list">
      <div className="heading-3 manage-users__user-list__item">
        {user.fullName}
      </div>
      <div className="heading-3 manage-users__user-list__item">
        {user.email}
      </div>
      <div className="heading-3 manage-users__user-list__item">
        {user.balance}
      </div>
      <div className="heading-3 manage-users__user-list__item">
        {user.admin === 5 ? "admin" : "user"}
      </div>
      <div className="heading-3 manage-users__user-list__item ">
        <div onClick={()=> setEdit(!edit)} className={edit ? 'heading-5 manage-users__user-list__item--save' :'heading-5 manage-users__user-list__item--edit'}>{edit ? 'save': 'edit'}</div>
        {edit && <div onClick={handleCancel} className="heading-5 manage-users__user-list__item--cancel">cancel</div>}
      </div>
    </div>
  );
};

export default UserDetails;