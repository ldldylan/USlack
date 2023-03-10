import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { createworkspace } from "../../../store/workspaces";
import { getUser } from "../../../store/session";
export default function CreateworkspaceModal({showCreateForm, setShowCreateForm}) {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.session.user)
    const { workspaceId } = useParams();
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    const handleCreateNewworkspace = (e) => {
        e.preventDefault();
        setErrors([]);
    
        dispatch(createworkspace({
            name: name,
            ownerId: currentUser.id})
        );

        setName("");
        dispatch(getUser())
    };
    0
    const openModal = (e) => {
        e.stopPropagation();
    };

    const closeModal = (e) => {
        e.preventDefault();
        setShowCreateForm(false);
    };
    
    return (
    <>
        <div className="create-workspace-modal" onClick={closeModal}>
            <div className="create-workspace-form" onClick={openModal}>
                <h1>Create a workspace</h1>
                <p>workspaces are where your team communicates. They're best when organized around an organization name.</p>
                <div>
                    <form onSubmit={handleCreateNewworkspace}>
                        <div className="new-workspace-name">
                            <label>Name</label>
                            <input className="new-workspace-name-input"
                                    value={name}
                                    placeholder="# e.g. plan-budget"
                                    onChange={(e) => setName(e.target.value)}>
                            </input>
                        </div>
                        <div className="new-workspace-description">
                            <label>Description</label>
                            <span>{"(optional)"}</span>
                            <input className="new-workspace-description-input"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}>
                            </input>
                            <p id='about-text'>What's this workspace about?</p>
                        </div>
                        <div>
                            <button
                            disabled={name.trim().length < 1} 
                            className={`create-workspace-button ${name.trim().length > 0 ? "-clickable" : ""
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