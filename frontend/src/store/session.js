import csrfFetch from "./csrf"
import { restoreCSRF } from "./csrf";

export const SET_CURRENT_USER = 'session/setCurrentUser';
const REMOVE_CUREENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (payload) => {
    return {
        type: SET_CURRENT_USER,
        payload
    }
}

const removeCurrentUser = () => {
    return {
        type: REMOVE_CUREENT_USER,
    }
}

const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}
// You need to call the API to login then set the session user from the response, so add a thunk action for the POST /api/session. Make sure to use the custom csrfFetch function from frontend/src/store/csrf.js. The POST /api/session route expects the request body to have a key of credential with an existing email and a key of password. After the response from the AJAX call comes back, parse the JSON body of the response, and dispatch the action for setting the session user to the user in the response's body.

// login thunk action
export const getUser = () => async dispatch => {
    // debugger
    const response = await csrfFetch("/api/session")
    // debugger
    const data = await response.json();
    dispatch(setCurrentUser(data));
    
}

export const login = ({ credential, password }) => async dispatch => {
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credential, password })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data));
    return response;
};

// signup thunk action
export const signup = (user) => async (dispatch) => {
    const {email, password} = user;
    const response = await csrfFetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
            email,
            password
        })
    })
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
}

// logout thunk action
export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
        method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
};


export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
};

const initialState = {
    user: JSON.parse(sessionStorage.getItem("currentUser"))
}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            // debugger
            if (!action.payload){
                return {...state, user: null}
            }
            else if (!action.payload.subscriptChannels) {
                return {...state, subscriptChannels: null}
            }
            else return { ...state, user: action.payload.user};
        case REMOVE_CUREENT_USER:
            return { ...state, user: null};
        default:
            return state;
    }
};

export default sessionReducer;



