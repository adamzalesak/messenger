import { atom } from "recoil";
import ConversationModel from "../models/Conversation.model";
import MessageModel from "../models/Message.model";


export const conversationsState = atom<ConversationModel[]>({
    key: 'conversationsState',
    default: []
});

export const activeConversationIdState = atom<number | null>({
  key: 'activeConversationIdState',
  default: null
});

export const activeConversationMessagesState = atom<MessageModel[] | null>({
  key: 'activeConversationMessagesState',
  default: null
});

export const conversationOpenedState = atom<boolean>({
  key: 'conversationOpenedState',
  default: false
});