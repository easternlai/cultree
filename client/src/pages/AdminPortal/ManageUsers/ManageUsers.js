import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import UserDetails from "../../../components/UserDetails/UserDetails";
import { getUsersService } from "../../../services/adminService";
import { INITIAL_STATE, manageUsersReducer } from "./manageUsersReducer";

const ManageUsers = ({ token }) => {
  const [state, dispatch] = useReducer(manageUsersReducer, INITIAL_STATE);

  useEffect(() => {
    (async function () {
      const users = await getUsersService(token);
      dispatch({ type: "GET_USERS", payload: users });
    })();
  }, []);

  console.log(state);
  return (
    <div className="layout-flat__body manage-users">
      <div className="heading-2">manage users</div>
      <div className="manage-users__user-list">
        <div className="heading-3__bold manage-users__user-list--header">name</div>
        <div className="heading-3__bold manage-users__user-list--header">email</div>
        <div className="heading-3__bold manage-users__user-list--header">points</div>
        <div className="heading-3__bold manage-users__user-list--header">privileges</div>
        <div className="heading-3__bold manage-users__user-list--header">-</div>
      </div>
      {state.users.length > 0 &&
        state.users.map((user) => (
          <UserDetails user={user} token={token} dispatch={dispatch} />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(ManageUsers);
