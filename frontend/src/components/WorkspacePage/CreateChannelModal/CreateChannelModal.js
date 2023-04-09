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

    const openModal = (e) => {
        e.stopPropagation();
    };

    const closeModal = (e) => {
        e.preventDefault();
        setName("");
        setDescription("");
        setShowCreateForm(false);
    };

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
        dispatch(getUser());
        setShowCreateForm(false);
    };
    

    return (
    <>
        <div className="create-channel-modal">
                <div className="create-channel-modal-header-container">
                    <h1 className="create-channel-modal-header">Create a channel</h1>
                    <button onClick={closeModal} className="cross-btn">
                        <CrossIcon size={22} />
                    </button>
                </div>
                <div className="create-channel-info">
                    <p id="info-create-channel">Channels are where your team communicates. They're best when organized around a topic — #marketing, for example.</p>
                <div>
                    <form onSubmit={handleCreateNewChannel}>
                        <div className="new-channel-name">
                            <p className="label">Name</p>
                            <input className="new-channel-name-input"
                                    value={name}
                                    placeholder="# e.g. plan-budget"
                                    onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>
                        <div className="new-channel-description">
                            <div className="new-channel-description-label">
                                <p className="label">Description</p>
                                <span className="clear-text">{"(optional)"}</span>
                            </div>
                            <input className="new-channel-description-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}>
                            </input>
                                <p className="clear-text">What's this channel about?</p>
                        </div>
                        <div className="create-channel-button-container">
                            <button
                            disabled={name.trim().length < 1} 
                            className={`create-channel-button ${name.trim().length > 0 ? "-clickable" : ""
                            }`}
                                ><p>Create</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>
    )
}