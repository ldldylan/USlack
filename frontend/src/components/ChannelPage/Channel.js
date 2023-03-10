import React from "react";
import "../WorkspacePage/Workspace.css"
import "../ChannelPage/Channel.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ChannelIndexItem from "../WorkspacePage/ChannelIndexItem";
import { BsFillCaretDownFill, BsCaretRightFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import CreateChannelModal from "../WorkspacePage/CreateChannelModal/CreateChannelModal";
import { fetchWorkspace } from "../../store/workspaces";
import { fetchChannel } from "../../store/channels";
import MessageIndexItem from "./MessageIndexItem ";
import { createMessage } from "../../store/message";
import * as sessionActions from '../../store/session';

export default function Channel() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);
    const { workspaceId } = useParams()
    const currentWorkspace = useSelector((state) => state.workspaces[workspaceId])
    const allSubscriptChannels = useSelector((state) => Object.values(state.subscriptChannels))
    let currentWorkspaceSubscriptChannels = []
    const {channelId} = useParams()
    const currentChannel = useSelector((state) => state.channels[channelId])
    const messages = useSelector((state) => Object.values(state.messages))
    const [newMessageText, setNewMessageText] = useState('')
    
    allSubscriptChannels.forEach(channel => {
        if (channel.workspaceId === parseInt(workspaceId)) {
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

    useEffect(()=> {
        dispatch(fetchChannel(channelId))
    }, [channelId])

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

    const handleCreateNewMessage = (e) => {
        e.preventDefault();
        dispatch(
            createMessage({
                text: newMessageText,
                authorId: currentUser.id,
                messageableType: "Channel",
                messageableId: parseInt(channelId)
            })
        );
        setNewMessageText('');
    }

    return allSubscriptChannels.length && currentUser ? (
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
                                {showChannels ? (<BsFillCaretDownFill size={12} />) : (<BsCaretRightFill size={12} />)}
                            </span>
                            <span>Channels</span>
                        </div>
                        <div className={!showChannels ? "hide-channels" : " "}>
                            {currentWorkspaceSubscriptChannels.map(subscriptChannel => <ChannelIndexItem key={subscriptChannel.id} currentUser={currentUser} workspaceId={parseInt(workspaceId)} subscriptChannel={subscriptChannel} />)}
                        </div>

                        <div
                            className="add-channels"
                            onClick={() => setShowCreateChannelModal(!showCreateChannelModal)}
                        >
                            <span id="add-channels-button">
                                <FaPlus size={12} />
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
                    <div className="channel-name-edit">
                        <h2># {currentChannel.name}</h2>
                    </div>
                    <div className="messages-container">
                            {messages.map(message => <MessageIndexItem key={message.id} message={message} currentUser={currentUser}/>)}
                        
                    </div>
                        <div className="new-meesage-container">
                            <div className="new-message-top">
                                
                            </div>
                            <div className="new-message-text">
                                <form onSubmit={handleCreateNewMessage}>
                                    <textarea value={newMessageText} onChange={(e) => {
                                        setNewMessageText(e.target.value)}} placeholder={`Message #${currentChannel.name}`}/>
                                    <div className="new-message-bottom">
                                        <div className="emoji"></div>
                                        <div className={`new-message-send-button${newMessageText.trim().length > 0 ? "-clickable" : ""}`}>
                                            <button className="send-button" disabled={newMessageText.trim().length === 0}> 
                                                <svg
                                                    data-y5v="true"
                                                    aria-hidden="true"
                                                    viewBox="0 0 20 20"
                                                    width="16"
                                                    height="16"
                                                >
                                                <path
                                                    fill="currentColor"
                                                    d="M1.5 2.25a.755.755 0 0 1 1-.71l15.596 7.807a.73.73 0 0 1 0 1.306L2.5 18.46l-.076.018a.749.749 0 0 1-.924-.728v-4.54c0-1.21.97-2.229 2.21-2.25l6.54-.17c.27-.01.75-.24.75-.79s-.5-.79-.75-.79l-6.54-.17A2.253 2.253 0 0 1 1.5 6.789v-4.54Z"
                                                />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    ) : null
}