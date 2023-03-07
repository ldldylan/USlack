import csrfFetch from './csrf';
import { SET_CURRENT_USER } from './session';
export const RECEIVE_WORKSPACES = "workspaces/RECEIVE_WORKSPACES";
export const RECEIVE_WORKSPACE = "workspaces/RECEIVE_WORKSPACE";
export const REMOVE_WORKSPACE = "workspaces/REMOVE_WORKSPACE";

export const receiveWorkspaces = (workspaces) => {
    return {
        type: RECEIVE_WORKSPACES,
        workspaces
    };
};

export const receiveWorkspace = (payload) => {
    return {
        type: RECEIVE_WORKSPACE,
        payload
    };
};

export const removeWorkspace = (workspaceId) => {
    return {
        type: REMOVE_WORKSPACE,
        workspaceId
    };
};

export const getWorkspaces = (state) => (
    state.workspaces ? Object.values(state.workspaces) : []
)

export const getWorkspace = (workspaceId) => (state) => (
    state.workspaces ? state.workspaces[workspaceId] : null
)


export const fetchWorkspaces = () => async dispatch => {
    const response = await csrfFetch('/api/workspaces');
    
    if (response.ok) {
        const workspaces = await response.json();
        dispatch(receiveWorkspaces(workspaces));
    }
};

export const fetchWorkspace = (workspaceId) => async dispatch => {
    const response = await csrfFetch(`/api/workspaces/${workspaceId}`);

    if (response.ok) {
    const workspace = await response.json();
    dispatch(receiveWorkspace(workspace));
    }
};

export const createWorkspace = (workspace) => async dispatch => {
    const response = await csrfFetch(`/api/workspaces`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workspace)
    })
    if (response.ok) {
        const newWorkspace = await response.json();
        dispatch(receiveWorkspace(newWorkspace))
        return workspace
    }
};

export const updateWorkspace = (workspace) => async dispatch => {
    const response = await csrfFetch(`/api/workspaces/${workspace.id}`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(workspace)
    })

    if (response.ok) {
        const updatedWorkspace = await response.json();
        dispatch(receiveWorkspace(updatedWorkspace))
    }
};

export const deleteWorkspace = (workspaceId) => async dispatch => {
    const response = await csrfFetch(`/api/workspaces/${workspaceId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removeWorkspace(workspaceId))
    }
};

export default function workspacesReducer(state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            if (!action.payload || !action.payload.workspaces) return state;
            else return action.payload.workspaces
            
        case RECEIVE_WORKSPACES:
            return {...action.workspaces};
            
        case RECEIVE_WORKSPACE:
            const workspace = action.payload.workspace
            return {...state, [workspace.id]: workspace};
            
        case REMOVE_WORKSPACE:
            const newState = {...state}
            delete newState[action.workspaceId]
            return newState;

        default:
            return state;
    }
};

