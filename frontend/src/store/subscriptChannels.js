import { SET_CURRENT_USER } from './session';

export default function subscriptChannelsReducer(state= {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            if (!action.payload) return state;
            else return action.payload.subscriptChannels;
        
        default:
            return state;
    }
}