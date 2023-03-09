import React from "react";
import "./Workspace.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ChannelIndexItem from "./ChannelIndexItem";
import { BsFillCaretDownFill, BsCaretRightFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import CreateChannelModal from "./CreateChannelModal/CreateChannelModal";
import { fetchWorkspace } from "../../store/workspaces";
import * as sessionActions from '../../store/session';

export default function Workspace() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);
    const {workspaceId} = useParams()
    const currentWorkspace = useSelector((state) => state.workspaces[workspaceId])
    const allSubscriptChannels = useSelector((state) => Object.values(state.subscriptChannels))
    let currentWorkspaceSubscriptChannels = []

    allSubscriptChannels.forEach(channel => {
        if(channel.workspaceId === parseInt(workspaceId)) {
            currentWorkspaceSubscriptChannels.push(channel)
        }
    })
    
    const [showChannels, setShowChannels] = useState(true)
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout()).then(history.push("/"));
    };

    const switchWorkspace =(e) => {
        e.preventDefault();
        history.push('/workspaces')
    }

    useEffect(() => {
        dispatch(fetchWorkspace(workspaceId))
    }, [])

    useEffect(() => {
        if (!currentUser) {
            history.push('/login')
        }
    }, [dispatch, currentUser, history])

    useEffect(() => {
        if (!allSubscriptChannels.length) {
            dispatch(fetchWorkspace(workspaceId));
        }
    }, [])

    // const handleAddChannelModal = () => {
    //     if (workspaceId === currentUser.id) {
    //         setShowCreateChannelModal(!showCreateChannelModal);
    //         // closeAddChannelModal();
    //     }
    // };

    // let currentChannel = {}
    // const handleChangeChannel = (subscriptChannel) => {
    //     currentChannel = subscriptChannel;
    // }
    // console.log(currentChannel)

    return allSubscriptChannels.length && currentWorkspace ? (
        <div className="workspace-page-container">
            <header className="workspace-page-header">
                <div className="workspace-page-header-left"></div>
                <button className="search-bar"></button>
                <div className="workspace-page-header-right">
                    <button onClick={switchWorkspace} className="switch-workspace-button">Switch Workspace</button>
                    <button onClick={logout} className="workspace-page-sign-out-button">Sign Out</button>
                </div>
            </header>
            <div className="workspace-chat-body">
                <div></div>
                <div className="workspace-side-bar">
                    <div className="workspace-name-edit">
                        <h2 id='workspace-name'>{currentWorkspace.name}</h2>
                    </div>
                    <section className="channels-list">
                        <div className="show-channels" onClick={() => setShowChannels(!showChannels)}>
                            <span id="show-channels-button">
                                {showChannels ? (<BsFillCaretDownFill size={12} />) : (<BsCaretRightFill  size={12} />)}
                            </span>
                            <span>Channels</span>
                        </div>
                        <div className={!showChannels ? "hide-channels" : " "}>
                            {currentWorkspaceSubscriptChannels.map(subscriptChannel => <ChannelIndexItem key={subscriptChannel.id} currentUser={currentUser} workspaceId={parseInt(workspaceId)} subscriptChannel={subscriptChannel}/>
                            )}
                        </div>
                        <div
                            className="add-channels"
                            onClick={() => setShowCreateChannelModal(!showCreateChannelModal)}
                            >
                            <span id="add-channels-button">
                                <FaPlus size={12}/>
                            </span>
                            <span id="add-channels-word">Add channels</span>
                        </div>
                        <div>
                            {showCreateChannelModal ? (
                                <div>
                                    <CreateChannelModal
                                        showCreateForm={showCreateChannelModal}
                                        setShowCreateForm={setShowCreateChannelModal}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </section>
                </div>
                <div className="chat-window">
                </div>
            </div>

        </div>
    ) : null
}