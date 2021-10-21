import ConversationModel from './Conversation.model';
import MessageModel from './Message.model';

export default interface UserModel {
    id: number;

    name: string;
    email: string;
    password: string;
  
    conversations: ConversationModel[];
    sentMessages: MessageModel[];
}
  