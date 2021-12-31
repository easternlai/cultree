export const INITIAL_STATE = {
    users: []
};

export const manageUsersReducer = (state, action) => {

    switch(action.type){
        case 'GET_USERS':
            console.log(action.payload.users);
            return {
                ...state,
                users: [...action.payload]
            }

        default: {
            throw new Error("Invalid action type passed to the manageUsers Reducer.");
        }
    }
}