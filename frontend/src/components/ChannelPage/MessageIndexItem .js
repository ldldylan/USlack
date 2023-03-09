import './MessageIndexItem.css'
import { useSelector } from 'react-redux'
export default function MessageIndexItem({message}) {
    const author = useSelector((state) => (state.users[parseInt(message.authorId)]))
    return (
        <div className='message-container'>
            <div className=''>
                {author.displayName}
            </div>
            <div> {message.text}
            </div>
        </div>
    )
}