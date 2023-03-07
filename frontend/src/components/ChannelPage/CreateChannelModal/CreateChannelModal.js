import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createChannel } from "../../../store/channels";
import { getUser } from "../../../store/session";
export default function CreateChannelModal({showCreateForm, setShowCreateForm}) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    const { workspaceId } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const createNewChannel = (e) => {
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
    

    return (
    <>
        <div className="create-channel-modal" onClick={closeModal}>
            <div className="create-channel-form" onClick={openModal}>
                <h1>Create a channel</h1>
                <p>Channels are where your team communicates. They're best when organized around a topic — #marketing, for example.</p>
                <div>
                    <form onSubmit={createNewChannel}>
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