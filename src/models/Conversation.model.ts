import { DateTime } from 'luxon';
import MessageModel from './Message.model';
import UserConversationModel from './UserConversation.model';


export default interface ConversationModel {
    id: number;
    updatedAt: DateTime;
  
    participants: UserConversationModel[];
  
    messages: MessageModel[];
}
