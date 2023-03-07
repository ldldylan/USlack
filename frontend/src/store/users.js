import { RECEIVE_WORKSPACE } from "./workspaces";

export default function usersReducer(state = {}, action) {

    switch (action.type) {
        case RECEIVE_WORKSPACE:
            // debugger
            if (!action.payload) return state;
            else return action.payload.users
        default:
            return state;
    }
};
