import React, { useEffect, useState } from 'react';
import { dateToTimestamp, sortByTimestamp } from './js/utils';
import List from './components/List';
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
  const messageUrl  = 'https://run.mocky.io/v3/cf8b2e79-16c1-4e2c-a288-003338355482';
  const memberUrl   = 'https://run.mocky.io/v3/21b03580-280a-47ee-9f6e-e8bec22416db';
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
      <h1>ChatLog Message</h1>
      <List data={chatLogs}/>
    </div>
  );
}

export default App;