import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import './Workspace.css'
import * as sessionActions from '../../store/session';
import wavingHandGif from "../../assests/images/waving-hand.gif"
import WorkspaceIndexItem from "./WorkspaceIndexItem";
import { getUser } from "../../store/session";

export default function Workspace() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);
    const subscriptWorkspaces = useSelector((state) => Object.values(state.subscriptWorkspaces))
    // const workspaces = currentUser.workspace_subscriptions.workspaces
    
    useEffect(() => {
        if (!currentUser) {
            history.push('/login')
        } 
    }, [dispatch, currentUser])
    
    useEffect(() => {
        if (!subscriptWorkspaces.length) {
            dispatch(getUser());
        }
    }, [])

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout()).then(history.push("/"));
    };
    
    return currentUser ? (
        <>
            <div className="workspace-container">
                <header className="workspace-header">
                    <div className="workspace-navigation-container">
                        <div className="workspace-navigation-bar">
                            <div to='/workspaces' className="workspace-logo">
                                <svg width="40" height="40" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M19.712.133a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386h5.376V5.52A5.381 5.381 0 0 0 19.712.133m0 14.365H5.376A5.381 5.381 0 0 0 0 19.884a5.381 5.381 0 0 0 5.376 5.387h14.336a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386" fill="#097eff"></path><path d="M53.76 19.884a5.381 5.381 0 0 0-5.376-5.386 5.381 5.381 0 0 0-5.376 5.386v5.387h5.376a5.381 5.381 0 0 0 5.376-5.387m-14.336 0V5.52A5.381 5.381 0 0 0 34.048.133a5.381 5.381 0 0 0-5.376 5.387v14.364a5.381 5.381 0 0 0 5.376 5.387 5.381 5.381 0 0 0 5.376-5.387" fill="#097eff"></path><path d="M34.048 54a5.381 5.381 0 0 0 5.376-5.387 5.381 5.381 0 0 0-5.376-5.386h-5.376v5.386A5.381 5.381 0 0 0 34.048 54m0-14.365h14.336a5.381 5.381 0 0 0 5.376-5.386 5.381 5.381 0 0 0-5.376-5.387H34.048a5.381 5.381 0 0 0-5.376 5.387 5.381 5.381 0 0 0 5.376 5.386" fill="#ecb12f"></path><path d="M0 34.249a5.381 5.381 0 0 0 5.376 5.386 5.381 5.381 0 0 0 5.376-5.386v-5.387H5.376A5.381 5.381 0 0 0 0 34.25m14.336-.001v14.364A5.381 5.381 0 0 0 19.712 54a5.381 5.381 0 0 0 5.376-5.387V34.25a5.381 5.381 0 0 0-5.376-5.387 5.381 5.381 0 0 0-5.376 5.387" fill="#ecb12f"></path></g></svg>
                                <h2>USlack</h2>
                            </div>
                            <div className="workspace-header-buttons">
                                <button id="header-new-workspace-button">CREATE A NEW WORKSPACE</button>
                                <button onClick={logout} id="workspace-sign-out-button">SIGN OUT</button>
                            </div>
                        </div>
                    </div>
                </header>
                <section className="workspace-body">
                    <div className="welcome-word">
                        <img src={wavingHandGif} alt="waving-hand"/>
                        <h1>Welcome back</h1>
                    </div>
                    <div className="workspaces-container">
                        <div className="workspace-show-box">
                            <div className="workspaces-for-user">
                                <p>Workspaces for {currentUser.email}</p>
                            </div>
                            <div className="workspace-element">
                                {subscriptWorkspaces.map(subscriptWorkspace => <WorkspaceIndexItem key={subscriptWorkspace.id} subscriptWorkspace={subscriptWorkspace}/> )}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    ) : null
}