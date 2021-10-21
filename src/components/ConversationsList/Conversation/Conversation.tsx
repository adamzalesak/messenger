import { DateTime } from 'luxon';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loggedUserId } from '../../../utils';
import ConversationModel from '../../../models/Conversation.model';
import { activeConversationIdState, conversationOpenedState } from '../../../store/atoms';
import useWindowDimensions from '../../../useWindowDimensions';
import './Conversation.css';

interface ConversationProps {
  conversation: ConversationModel;
}


const Conversation: React.FC<ConversationProps> = ({ conversation }) => {
  const [activeConversationId, setActiveConversationId] = useRecoilState(activeConversationIdState);
  const setConversationOpened = useSetRecoilState(conversationOpenedState);
  const { width } = useWindowDimensions();

  const participants = conversation.participants.filter(p => p.user.id !== loggedUserId(window.location.pathname));


  return (
    <li
      className={
        "conversations-list__item conversation" +
        (conversation.id === activeConversationId && width >= 600
          ? " conversation--active"
          : "")
      }
      onClick={() => {
        setActiveConversationId(conversation.id);
        setConversationOpened(true);
      }}
    >
      <img
        className="conversation__profile"
        alt="profile"
        src="/icons/avatar.svg"
      />
      <div className="conversation__info">
        <div className="conversation__detail">
          <span className="conversation__name">
            {participants.map((p) =>
              p.id !== participants[participants.length - 1]?.id
                ? `${p.user.name}, `
                : p.user.name
            )}
          </span>
          <span className="conversation__time">
            {conversation.updatedAt.hasSame(DateTime.now(), "day")
              ? conversation.updatedAt.toFormat("HH:mm")
              : conversation.updatedAt.toFormat("dd.MM.yyyy HH:mm")}
          </span>
        </div>
        <span className="conversation__message">
          <span className="conversation__from">
            {
              conversation.messages[0]?.author.name === undefined ? null :
                conversation.messages[0]?.authorId === loggedUserId(window.location.pathname)
                  ? "Me: "
                  : `${conversation.messages[0]?.author.name}: `
            }
          </span>
          {conversation.messages[0]?.content}
        </span>
      </div>
    </li>
  );
};

export default Conversation;