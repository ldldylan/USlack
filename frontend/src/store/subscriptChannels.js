import { SET_CURRENT_USER } from './session';
import { RECEIVE_WORKSPACE } from './workspaces';

export default function subscriptChannelsReducer(state= {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            if (!action.payload || !action.payload.user) return state;
            else return action.payload.subscriptChannels;
        
        case RECEIVE_WORKSPACE:
            return action.payload.subscriptChannels
        default:
            return state;
    }
}