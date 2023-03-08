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
import { fetchMessages } from "../../store/message";
import { fetchChannel } from "../../store/channels";

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
    const messages = useSelector((state) => state.messages)
    
    allSubscriptChannels.forEach(channel => {
        if (channel.workspaceId === parseInt(workspaceId)) {
            currentWorkspaceSubscriptChannels.push(channel)
        }
    })
    
    const [showChannels, setShowChannels] = useState(true)
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    
    // useEffect(() => {
    //     dispatch(fetchWorkspace(workspaceId))
    // }, [])

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

    // useEffect(() => {
    //     dispatch(fetchMessages(channelId))
    // }, [])
    console.log(messages)
    return allSubscriptChannels.length ? (
        <div className="workspace-page-container">
            <header className="workspace-page-header">
                <div className="workspace-page-header-left"></div>
                <button className="search-bar"></button>
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

                    </div>
                        <div className="new-meesage-container">
                            new-message
                            {/* {messages.map} */}
                        </div>
                </div>
            </div>
        </div>
    ) : null
}