import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import sessionReducer from './session';
import workspacesReducer from './workspaces';
import subscriptWorkspacesReducer from './subscriptWorkspaces';
import channelReducer from './channels';
import subscriptChannelsReducer from './subscriptChannels';
import usersReducer from './users';
import messageReducer from './message';

const rootReducer = combineReducers ({
    session: sessionReducer,
    users: usersReducer,
    workspaces: workspacesReducer,
    subscriptWorkspaces: subscriptWorkspacesReducer,
    channels: channelReducer,
    subscriptChannels: subscriptChannelsReducer,
    messages: messageReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;