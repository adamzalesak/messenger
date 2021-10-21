import { useRecoilValue } from "recoil";
import { loggedUserId } from "../../utils";
import { activeConversationIdState } from "../../store/atoms";
import { conversationsState } from "../../store/atoms";

const ConversationTitle: React.FC = () => {

  const conversations = useRecoilValue(conversationsState);
  const activeConversationId = useRecoilValue(activeConversationIdState);

  const participants = conversations.filter(c => c.id === activeConversationId)[0]?.participants.filter(p => p.user.id !== loggedUserId(window.location.pathname));

  return (
    <span className="section-title section-title--conversation">
      {participants?.map((p) =>
        p.id !== participants[participants.length - 1]?.id
          ? `${p.user.name}, `
          : p.user.name
      )}
    </span>
  );
};

export default ConversationTitle;
