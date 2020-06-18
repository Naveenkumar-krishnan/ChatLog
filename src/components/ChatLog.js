import React from 'react';
import Avatar from './Avatar';
import MessageContainer from './MessageContainer';

function ChatLog({ data }) {
  return (
    <div>
      {data.map((rowData, index) => (
        <div key={`container-${index}`}>
          <div className="innerList avatar-container" key={`avatar-${index}`}>
            <Avatar avatar={rowData.avatar} email={rowData.email}/>
          </div>
          <div className="list" key={`message-${index}`}>
            <MessageContainer index={index} rowData={rowData}/>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatLog;