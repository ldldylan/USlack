import './MessageIndexItem.css'
import { useSelector, useDispatch } from 'react-redux'
import { deleteMessage, updateMessage } from '../../store/message';
import { useState } from 'react';
import EditMessageModal from './EditMessageModal/EditMessageModal';
import DeleteMessageModal from './DeleteMessageModal/DeleteMessageModal';
import userImg1 from "../../assests/images/default-user-img-1.png";
import userImg2 from "../../assests/images/default-user-img-2.png";
import userImg3 from "../../assests/images/default-user-img-3.png";
import userImg4 from "../../assests/images/default-user-img-4.png";
import userImg5 from "../../assests/images/default-user-img-5.png";

export default function MessageIndexItem({message, currentUser}) {
    const dispatch = useDispatch();
    const author = useSelector((state) => (state.users[parseInt(message.authorId)]));
    let isAuthor = false;
    if(currentUser.id === message.authorId) {
        isAuthor = true
    }
    const imageId = message.authorId % 5
    let userImg = userImg1; 
    switch (imageId) {
        case 1:
            userImg = userImg1
            break;
        case 2:
            userImg = userImg2
            break;
        case 3:
            userImg = userImg3
            break;
        case 4:
            userImg = userImg4
            break;
        default:
            userImg = userImg5
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
            <div style={{
                padding: "10px 20px",
                display: "flex",
            }}> 
                <div className='message-image-container'>
                    <img
                        className="user-image"
                        height={36}
                        width={36}
                        src={userImg}
                        alt="user-img"
                    />
                </div>

                <div style={{ marginLeft: "10px", width:'100%' }}>
                    <div className='author-name-and-date'>
                        <strong id='author-name'>{author.displayName}</strong>
                        <span id='message-time'>{convertDate(message.updatedAt)}</span>
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

            </div>
            
        </div>
    )
}