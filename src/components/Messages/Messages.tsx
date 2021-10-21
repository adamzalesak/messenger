import "./Messages.css";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeConversationIdState,
  activeConversationMessagesState,
} from "../../store/atoms";
import MessageModel from "../../models/Message.model";
import useSWR from "swr";
import { apiUrl, loggedUserId, loggedUserName } from "../../utils";

const Messages: React.FC = () => {
  const activeConversationId = useRecoilValue(activeConversationIdState);
  const [activeConversationMessages, setActiveConversationMessages] =
    useRecoilState(activeConversationMessagesState);

  const fetcher = (url: RequestInfo) =>
    fetch(url, {
      method: "GET",
      headers: {
        "X-User": loggedUserId(window.location.pathname).toString(),
      },
    }).then((r) => r.json());

  const { data } = useSWR(
    apiUrl + `/conversation/${activeConversationId}/messages`,
    fetcher,
    { refreshInterval: 3000, dedupingInterval: 3000 }
  );

  useEffect(() => {
    if (data) {
      setActiveConversationMessages(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const deleteMessage = async (url: RequestInfo) =>
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-User": loggedUserId(window.location.pathname).toString(),
      },
    }).then((r) => r.json());

  return (
    <div className="messages">
      {activeConversationMessages
        ?.filter((m) => !m.deletedAt)
        .map((m: MessageModel) =>
          m.authorId === loggedUserId(window.location.pathname) ? (
            <div
              className="messages__content messages__content--from-me"
              key={m.uuid}
              onContextMenu={(e) => {
                e.preventDefault();
                deleteMessage(
                  apiUrl +
                    `/conversation/${activeConversationId}/message/${m.uuid}`
                );
                setActiveConversationMessages(
                  activeConversationMessages.filter(
                    (message) => message.uuid !== m.uuid
                  )
                );
              }}
            >
              {m.content}
            </div>
          ) : (
            <div className="messages__content-containter">
              <div className="messages__author-name">
                {loggedUserName(m.authorId)}:
              </div>
              <div className="messages__content" key={m.uuid}>
                {m.content}
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default Messages;
