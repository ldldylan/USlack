import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";
import { RECEIVE_WORKSPACE } from "./workspaces";
import { RECEIVE_MESSAGES } from "./message";

export const RECEIVE_CHANNELS = "channels/RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "channels/RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "channels/REMOVE_CHANNEL";

// action creators
export const receiveChannels = (channels) => {
    return {
        type: RECEIVE_CHANNELS,
        channels
    };
};

export const receiveChannel = (payload) => {
    return {
        type: RECEIVE_CHANNEL,
        payload
    };
};

export const removeChannel = (channelId) => {
    return {
        type: REMOVE_CHANNEL,
        channelId
    };
};

export const getChannels = (state) => (
    state.channels ? Object.values(state.channel) : []
)

export const getWorkspace = (channelId) => (state) => (
    state.channels ? state.workspace[channelId] : null
)

// thunk action creators
export const fetchChannels = (workspaceId) => async dispatch => {
    const response = await csrfFetch(`/api/workspace/${workspaceId}/channels`);

    if (response.ok) {
        const channels = await response.json();
        dispatch(receiveChannels(channels));
        return channels;
    }
};

export const fetchChannel = (channelId) => async dispatch => {
    const response = await csrfFetch(`/api/channels/${channelId}`);

    if (response.ok) {
        const channel = await response.json();
        dispatch(receiveChannel(channel));
        return channel;
    }
};

export const createChannel = (channel) => async dispatch => {
        const response = await csrfFetch(`/api/channels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(channel)
    });

    if (response.ok) {
        const newChannel = await response.json();
        dispatch(receiveChannel(newChannel))
        return newChannel
    }
};

export const updateChannel = (channel) => async dispatch => {
    const response = await csrfFetch(`/api/channels/${channel.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(channel)
    });

    if (response.ok) {
        const channel = await response.json();
        dispatch(receiveChannel(channel));
    }
};

export const deleteChannel = (channelId) => async (dispatch) => {
        const response = await csrfFetch(`/api/channels/${channelId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        dispatch(removeChannel(channelId));
    }
};

export default function channelReducer(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            // debugger
            if (!action.payload || !action.payload.user ) return state;
            else return action.payload.channels
        case RECEIVE_WORKSPACE:
            return action.payload.channels
        
        case RECEIVE_CHANNELS:
            return {...action.channels};
            
        case RECEIVE_CHANNEL:
            const channel = action.payload.channel
            return {...state, [channel.id]: channel};
            
        case REMOVE_CHANNEL:
            const newState = {...state}
            delete newState[action.channelId]
            return newState;

        default:
            return state;
    }
};