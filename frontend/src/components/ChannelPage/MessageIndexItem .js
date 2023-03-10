import './MessageIndexItem.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteMessage, updateMessage } from '../../store/message';
import { useState } from 'react';
import EditMessageModal from './EditMessageModal/EditMessageModal';
import DeleteMessageModal from './DeleteMessageModal/DeleteMessageModal';
export default function MessageIndexItem({message, currentUser}) {
    const dispatch = useDispatch();
    const author = useSelector((state) => (state.users[parseInt(message.authorId)]));
    let isAuthor = false;
    if(currentUser.id === message.authorId) {
        isAuthor = true
    }

    const [showEditMessageModal, setShowEditMessageModal] = useState(false)
    const [showDeleteMessageModal, setShowDeleteMessageModal] = useState(false)

        const convertDate = (time) => {
        const date = new Date(time);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${month}/${day}/${year} 
        ${date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}`;


        return formattedDate;
    }
    
    return (
        <div className='message-container'>
            <div className='author-name-and-date'>
                {author.displayName}
                <span id='message-time'> {convertDate(message.updatedAt)}</span>
            </div>
            <div className='message-text'> 
                <p>{message.text}</p>
                <span className={isAuthor ? 'edit-delete-options' : 'no-edit-delete-option'}>
                    <button onClick={() => setShowEditMessageModal(true)} className='edit-button'>edit</button>
                    <button onClick={() => setShowDeleteMessageModal(true)} className='delete-button'>delete</button>
                </span>
            </div>
            <div className={showEditMessageModal ? 'edit-modal' : 'no-edit-modal'}>
                <EditMessageModal message={message} currentUser={currentUser} setShowEditMessageModal={setShowEditMessageModal} />
            </div>
            <div className={showDeleteMessageModal ? 'delete-modal' : 'no-delete-modal'}>
                <DeleteMessageModal message={message} setShowDeleteMessageModal={setShowDeleteMessageModal}/>
            </div>
            
        </div>
    )
}