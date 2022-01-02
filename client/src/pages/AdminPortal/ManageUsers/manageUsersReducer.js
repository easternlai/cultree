export const INITIAL_STATE = {
    users: [],
    error: false,
    fetching: false,
};

export const manageUsersReducer = (state, action) => {

    switch(action.type){
        case 'GET_USERS':
            return {
                ...state,
                users: [...action.payload]
            }

        case 'EDIT_USER':
            const users = state.users;
            const userIndex = users.findIndex(user => user._id === action.payload.userId );
            users[userIndex].admin = action.payload.admin;
            users[userIndex].balance = action.payload.balance;
            return {
                ...state,
                users: [...users],
            }

        default: {
            throw new Error ("Invalid action type passed to the manageUsers Reducer.");
        }
    }
}