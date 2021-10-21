import {  useRecoilValue } from 'recoil';
import { conversationsState } from '../../store/atoms';
import Conversation from './Conversation/Conversation';
import './ConversationsList.css';


const ConversationsList: React.FC = () => {
    const conversations = useRecoilValue(conversationsState);

    return (
    <ul className="conversations-list">
        {conversations.map(c => <Conversation conversation={c} key={c.id} />)}
    </ul>
)};

export default ConversationsList;