import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createChannel } from "../../../store/channels";
import { getUser } from "../../../store/session";
import './CreateChannelModal.css'
import CrossIcon from "../../Svgs/CrossIcon.js";
export default function CreateChannelModal({showCreateForm, setShowCreateForm}) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    const { workspaceId } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const handleCreateNewChannel = (e) => {
        e.preventDefault();
        setErrors([]);
    
        dispatch(createChannel({
            name: name,
            description: description,
            workspaceId: workspaceId,
            ownerId: currentUser.id})
        );

        setName("");
        setDescription("");
        dispatch(getUser())
    };
    
    const openModal = (e) => {
        e.stopPropagation();
    };

    const closeModal = (e) => {
        e.preventDefault();
        setShowCreateForm(false);
    };

    const handleCloseModal = () => {
        setName("");
        setDescription("");
        // handleAddChannelModal();
        setShowCreateForm(false);
    };
    
    return (
    <>
        <div className="create-channel-modal" onClick={closeModal}>
                <div className="create-channel-modal-header-container">
                    <h1 className="create-channel-modal-header">Create a channel</h1>
                    <button onClick={handleCloseModal} className="cross-btn">
                        <CrossIcon size={22} />
                    </button>
                </div>
            <div className="create-channel-form" onClick={openModal}>
                    <p id="info-create-channel">Channels are where your team communicates. They're best when organized around a topic — #marketing, for example.</p>
                <div>
                    <form onSubmit={handleCreateNewChannel}>
                        <div className="new-channel-name">
                            <label>Name</label>
                            <input className="new-channel-name-input"
                                    value={name}
                                    placeholder="# e.g. plan-budget"
                                    onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>
                        <div className="new-channel-description">
                            <label>Description</label>
                            <span>{"(optional)"}</span>
                            <input className="new-channel-description-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}>
                            </input>
                            <p id='about-text'>What's this channel about?</p>
                        </div>
                        <div>
                            <button
                            disabled={name.trim().length < 1} 
                            className={`create-channel-button ${name.trim().length > 0 ? "-clickable" : ""
                            }`}
                            >Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>
    )
}