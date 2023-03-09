import csrfFetch from "./csrf";
import { RECEIVE_CHANNEL } from "./channels";

export const RECEIVE_MESSAGES = "messages/RECEIVE_MESSAGES";
export const RECEIVE_MESSAGE = "messages/RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "messages/REMOVE_MESSAGE";

export const receiveMessages = (messages) => {
    return {
        type: RECEIVE_MESSAGES,
        messages
    };
};

export const receiveMessage = (payload) => {
    return {
        type: RECEIVE_MESSAGE,
        payload
    };
};

export const removeMessage = (messageId) => {
    return {
        type: REMOVE_MESSAGE,
        messageId
    };
};

export const fetchMessages = (channelId) => async (dispatch) => {
    const response = await csrfFetch(`api/channel/${channelId}/messages`)
    if (response.ok) {
        const messages = await response.json();
        dispatch(receiveMessages(messages))
    }
}

export const fetchMessage = (messageId) => async (dispatch) => {
    const response = await csrfFetch(`api/messages/${messageId}`)
    if (response.ok) {
        const message = await response.json();
        dispatch(receiveMessage(message))
    }
}

export const createMessage = (message) => async dispatch => {
    // debugger
    const response = await csrfFetch(`/api/messages`, {
        method: "POST",
        body: JSON.stringify({message: message})
    })
    if (response.ok) {
        const newMessage = await response.json();
        dispatch(receiveMessage(newMessage))
    }
}

export const updateMessage = (message) => async dispatch => {
    debugger
    const response = await csrfFetch(`/api/messages/${message.id}`, {
        method: "PATCH",
        body: JSON.stringify(message)
    })

    if (response.ok) {
        const updatedMessage = await response.json();
        dispatch(receiveMessage(updatedMessage))
    }
}

export const deleteMessage = (messageId) => async dispatch => {
    debugger
    const response = await csrfFetch(`/api/messages/${messageId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        dispatch(removeMessage(messageId))
    }
}

export default function messageReducer(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CHANNEL:
            return action.payload.messages
        case RECEIVE_MESSAGES:
            return {...action.messages}
        case RECEIVE_MESSAGE:
            const message = action.payload.message
            return {...state, [message.id]: message}
        case REMOVE_MESSAGE:
            const newState = {...state}
            delete newState[action.messageId]
            return newState;
        default:
            return state;
    }
}