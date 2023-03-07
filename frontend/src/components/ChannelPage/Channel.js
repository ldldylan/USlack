import React from "react";
import "./Channel.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ChannelTopNav from "./ChannelTopNav";
import ChannelIndexItem from "./ChannelIndexItem";
import ChatWindow from "./ChatWindow";
import { BsFillCaretDownFill, BsCaretRightFill } from "react-icons/bs";
import { getUser } from "../../store/session";
import { FaPlus } from "react-icons/fa";
import CreateChannelModal from "./CreateChannelModal/CreateChannelModal";
import { fetchWorkspace } from "../../store/workspaces";

export default function Channel() {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => state.session.user);
    const {workspaceId} = useParams()
    const currentWorkspace = useSelector((state) => state.subscriptWorkspaces[workspaceId])
    const allSubscriptChannels = useSelector((state) => Object.values(state.subscriptChannels))
    let currentWorkspaceSubscriptChannels = []

    allSubscriptChannels.forEach(channel => {
        if(channel.workspaceId === parseInt(workspaceId)) {
            currentWorkspaceSubscriptChannels.push(channel)
        }
    })
    
    const [showChannels, setShowChannels] = useState(true)
    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    useEffect(() => {
        fetchWorkspace(workspaceId)
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

    return allSubscriptChannels.length ? (
        <div className="channel-container">
            <header>
                <ChannelTopNav />
            </header>
            <div className="channel-side-bar">
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
                        {currentWorkspaceSubscriptChannels.map(subscriptChannel => <ChannelIndexItem key={subscriptChannel.id} currentUser={currentUser} workspaceId={parseInt(workspaceId)} subscriptChannel={subscriptChannel}/>)}
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
            <div>
                <ChatWindow />
            </div>
        </div>
    ) : null
}