import { useRecoilValue } from "recoil";
import { loggedUserId } from "../../utils";
import { conversationsState } from "../../store/atoms";
import './ConversationsListHeader.css';

const ConversationsListHeader: React.FC = () => {
  const conversations = useRecoilValue(conversationsState);

  return (
    <div className="conversations-list-header">
      <div className="conversations-list-header__title">
        <h1 className="conversations-list-header__title-text">Messages</h1>
        <span className="conversations-list-header__title-number">{conversations.filter(c => c.participants.filter(p => p.user.id === loggedUserId(window.location.pathname))).length}</span>
      </div>
      <div className="conversations-list-header__menu">
        <a
          className="conversations-list-header__menu-item conversations-list-header__menu-item--active"
          href="/"
        >
          Recent
        </a>
        <a className="conversations-list-header__menu-item" href="/">
          Pinned
        </a>
      </div>
    </div>
  );
};

export default ConversationsListHeader;
