import { useDispatch } from "react-redux";
import { deleteMessage } from "../../../store/message";

export default function DeleteMessageModal({message, setShowDeleteMessageModal}) {
    const dispatch = useDispatch()
    const handleDeleteMessage = (e) => {
        e.preventDefault();
        dispatch(
            deleteMessage(
                parseInt(message.id)
            )
        )
        setShowDeleteMessageModal(false)
    }

    const handleCancelAction = (e) => {
        e.preventDefault();
        setShowDeleteMessageModal(false)
    }

    return (
        <div className="delete-option">
            <p>Are you sure you want to delete this message? This cannot be undone.</p>
            <button id='cancel-delete-button' onClick={(e) => handleCancelAction(e)}>
                cancel
            </button>
            <button id='confirm-delete-button' onClick={(e) => handleDeleteMessage(e)}>
                delete
            </button>
        </div>
    )
}