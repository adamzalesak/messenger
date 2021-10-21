import ConversationModel from './Conversation.model';
import UserModel from './User.model';

export default interface UserConversationModel {
    id: number;
    isPinned: boolean;
  
    user: UserModel;
    conversation: ConversationModel;
    userId: number;
    conversationId: number;
}
  