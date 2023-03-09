import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMessage } from "../../../store/message";
import "./EditMessageModal.css"
export default function EditMessageModal({message, currentUser, setShowEditMessageModal}) {
    const dispatch = useDispatch()
    const [updatedMessageText, setUpdatedMessageText] = useState(message.text);
    const handleEditMessage =(e) => {
        e.preventDefault();
        dispatch(
            updateMessage({
                id: message.id,
                text: updatedMessageText,
                authorId: currentUser.id,
                messageableType: "Channel",
                messageableId: parseInt(message.channelId)
            })
        )
        setUpdatedMessageText('');
        setShowEditMessageModal(false);
    }

    const handleCancelAction = (e) => {
        e.preventDefault();
        setShowEditMessageModal(false)
    }

    return (<>
        <form className="edit-message-form">
            <textarea value={updatedMessageText} onChange={(e) => {
                setUpdatedMessageText(e.target.value)}} placeholder={message.text}/>
            <div className={`edit-message-button${updatedMessageText.trim().length > 0 ? "-clickable" : ""}`}>
                <button onClick={(e) => handleCancelAction(e)} className="cancle-edit-button">cancel</button>
                <button onClick={(e) => handleEditMessage(e)} className="edit-button" disabled={updatedMessageText.trim().length === 0}> 
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
        </form>
    </>)
}