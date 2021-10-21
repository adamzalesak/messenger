import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import ConversationModel from '../../models/Conversation.model';
import MessageModel from '../../models/Message.model';
import { activeConversationIdState, activeConversationMessagesState, conversationOpenedState, conversationsState } from '../../store/atoms';
import { v4 as uuidv4 } from 'uuid';
import './BottomBox.css';
import { DateTime } from 'luxon';
import useWindowDimensions from '../../useWindowDimensions';
import { apiUrl, loggedUserId, users } from '../../utils';


const BottomBox: React.FC = () => {
    const [conversations, setConversations] = useRecoilState(conversationsState);
    const activeConversationId = useRecoilValue(activeConversationIdState);
    const [activeConversationMessages, setActiveConversationMessages] = useRecoilState(activeConversationMessagesState);
    const [conversationOpened, setConversationOpened] = useRecoilState(conversationOpenedState);
    const { width } = useWindowDimensions();

    const [messageInput, setMessageInput] = useState('');


    const send = () => {
        if (messageInput.match(/^ *$/)) return;
        const thisConversation: ConversationModel = { ...conversations.find(c => c.id === activeConversationId)! };
        let conversationsUpdate: ConversationModel[] = conversations.filter(c => c.id !== activeConversationId);
        const newMessage: MessageModel = {
            author: users[loggedUserId(window.location.pathname)],
            authorId: loggedUserId(window.location.pathname),
            conversation: thisConversation,
            conversationId: thisConversation.id,
            sendAt: DateTime.now(),
            uuid: uuidv4(),
            content: messageInput
        }
        thisConversation.messages = [newMessage, ...thisConversation.messages];
        thisConversation.updatedAt = DateTime.now();
        conversationsUpdate = [thisConversation!, ...conversationsUpdate];
        setConversations(conversationsUpdate);

        setActiveConversationMessages([newMessage, ...(activeConversationMessages ? activeConversationMessages : []) ]);

        const fetcher = async (url: RequestInfo) => fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-User": loggedUserId(window.location.pathname)!.toString()
            },
            body: JSON.stringify({ "content": messageInput })
          }).then(r => r.json());
        fetcher(apiUrl + `/conversation/${activeConversationId}/message`);

        setMessageInput('');
    }


    return (
        <div className={"bottom-box" + (!conversationOpened && width < 600 ? " bottom-box--conversation-closed" : "")}>
            <div className={"new-message" + (!conversationOpened && width < 600 ? " hide" : "")}>
                <button className="button button--close" type="button" onClick={() => setConversationOpened(false)}>
                    <img className="button__icon button__icon--close" alt="close" src="/icons/x.svg" />
                </button>
                <form className="new-message__form" onSubmit={event => { event.preventDefault(); send() }}>
                    <input type="text" className="input-field input-field--new-message" placeholder="Type your message" value={messageInput} onChange={event => setMessageInput(event.target.value)} />
                    <button type="submit" className="button button--input-field">
                        <img className="button__icon button__icon--input-field" alt="send" src="/icons/send.svg" />
                    </button>
                </form>
            </div>
            <div className="bottom-box__buttons">
                <button className={"button button--send-image" + (!conversationOpened && width < 600 ? " hide" : "")}>
                    <img className="button__icon" alt="send image" src="/icons/image.svg" aria-hidden="true" />
                    <span className="button__description">Image</span>
                </button>
                <button className={"button button--send-file" + (!conversationOpened && width < 600 ? " hide" : "")}>
                    <img className="button__icon" alt="send file" src="/icons/file.svg" aria-hidden="true" />
                    <span className="button__description">File</span>
                </button>
                <button className={"button button--contacts" + (!conversationOpened && width < 600 ? " hide" : "")}>
                    <img className="button__icon" alt="contacts" src="/icons/contacts-mobile.svg" aria-hidden="true" />
                    <span className="button__description">Contacts</span>
                </button>
                <button className={"button button--message" + (!conversationOpened && width < 600 ? " show-flex" : "")}>
                    <img className="button__icon" alt="message" src="/icons/message-mobile.svg" aria-hidden="true" />
                    <span className="button__description">Message</span>
                </button>
                <button className="button button--dark-mode">
                    <img className="button__icon" alt="dark mode" src="/icons/dark-mode-mobile.svg" aria-hidden="true" />
                    <span className="button__description">Dark mode</span>
                </button>
            </div>
        </div>
    )
};

export default BottomBox;