import { SET_CURRENT_USER } from './session';

export default function subscriptWorkspacesReducer(state= {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            // debugger
            if (!action.payload) {
                return state;
            } 
            else {
                // debugger
                return action.payload.subscriptWorkspaces
            } 
        default:
            return state;
    }
}