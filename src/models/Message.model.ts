import { DateTime } from 'luxon';
import ConversationModel from './Conversation.model';
import UserModel from './User.model';

export default interface MessageModel {
    uuid: string;

    content: String;
    sendAt: DateTime;
    editedAt?: DateTime;
    deletedAt?: DateTime;

    conversation: ConversationModel;
    conversationId: number;
    author: UserModel;
    authorId: number;

    // files                 File[]
    // images                Image[]
}
  