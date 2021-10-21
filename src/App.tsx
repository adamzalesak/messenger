import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Messages from './components/Messages/Messages';
import BottomBox from './components/BottomBox/BottomBox';
import SearchBar from './components/SearchBar/SearchBar';
import ConversationsList from './components/ConversationsList/ConversationsList';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeConversationIdState, activeConversationMessagesState, conversationOpenedState, conversationsState } from './store/atoms';
import useWindowDimensions from './useWindowDimensions';
import ConversationTitle from './components/ConversationTitle/ConversationTitle';
import ConversationsListHeader from './components/ConversationsListHeader/ConversationsListHeader';
import useSWR from 'swr';
import { useEffect } from 'react';
import { DateTime } from 'luxon';
import MessageModel from './models/Message.model';
import UserConversationModel from './models/UserConversation.model';
import { apiUrl, loggedUserId } from './utils';

function App() {  
  const conversationOpened = useRecoilValue(conversationOpenedState);
  const { width } = useWindowDimensions();

  const setConversations = useSetRecoilState(conversationsState);
  const activeConversation = useRecoilValue(activeConversationMessagesState);
  const setActiveConversationId = useSetRecoilState(activeConversationIdState);

  
  const fetcher = (url: RequestInfo) => fetch(url, {
    method: "GET",
    headers: {
      "X-User": loggedUserId(window.location.pathname).toString()
    }
  }).then(r => r.json());

  const { data } = useSWR(
    apiUrl + "/conversation/recent",
    fetcher,
    { refreshInterval: 3000, dedupingInterval: 3000 }
  );

  useEffect(() => {
    if (data) {
      setConversations(
        data.map(
          (c: {
            id: number;
            messages: MessageModel[];
            participants: UserConversationModel[];
            updatedAt: string;
          }) => ({
            id: c.id,
            messages: c.messages,
            participants: c.participants,
            updatedAt: DateTime.fromISO(c.updatedAt),
          })
        )
      );
      if (!activeConversation) {
        setActiveConversationId(data[0]?.id);
      } 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);


  return (
    <main className={"main" + (!conversationOpened && width < 600 ? " main--conversation-closed" : "")}>
      <Sidebar />

      <span className="section-title section-title--conversations-list">
        Recent
      </span>

      <ConversationsListHeader />

      <ConversationsList />

      <header className="main-header">
        <span className="main-header__title">Messenger</span>
      </header>

      <SearchBar />

      <Messages />

      <ConversationTitle />

      <BottomBox />
    </main>
  );
}

export default App;
