import React, { useEffect, useState } from 'react';
import { dateToTimestamp, sortByTimestamp } from './js/utils';
import ChatLog from './components/ChatLog';
import './App.css';

function useFetch(url) {
  console.log("useFetch");
  const [response, setResponse] = useState(null);
  useEffect(() => {
    const FetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        console.log(error);;
      }
    };
    FetchData();
  }, [url]);
  return response
}

function returnChat(memberList, messageList) {
  const chatLogMessages = [];
  const tmpMemberObj    = {};
  memberList.forEach((member) => {
    tmpMemberObj[member.id] = {
      fullName: `${member.firstName} ${member.lastName}`,
      email: member.email,
      avatar: member.avatar
    }
  });
  messageList.forEach((message) => {
    let key = message.userId;
    if(key in tmpMemberObj) {
      return chatLogMessages.push({
        messageId: message.id,
        userId: message.userId,
        fullName: tmpMemberObj[key].fullName,
        timestamp: dateToTimestamp(message.timestamp),
        email: tmpMemberObj[key].email,
        message: message.message,
        avatar: tmpMemberObj[key].avatar
      })
    }
  });
  return chatLogMessages
}

function App() {
  const [ chatLogs, setChatLogs ] = useState([]);
  const messageUrl  = 'https://run.mocky.io/v3/5d709398-134b-4d72-b252-7c2175a67203';
  const memberUrl   = 'https://run.mocky.io/v3/27d147dd-82ab-4bc2-8f61-814ac77c3b07';
  const messageList = useFetch(messageUrl);
  const memberList  = useFetch(memberUrl);

  useEffect(() => {
    if(memberList && messageList) {
      var chatLogMessages = returnChat(memberList, messageList);
      chatLogMessages && setChatLogs(sortByTimestamp(chatLogMessages));
    }
  }, [messageList, memberList])

  if (!messageList && !memberList) {
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <ChatLog data={chatLogs}/>
    </div>
  );
}

export default App;