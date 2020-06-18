import React from 'react';
import { timestampToDate } from '../js/utils';

function MessageContainer(props) {
  return (
    <>
    <div className="innerList">
      <div className="listContent" key={`${props.index} ${props.rowData.fullName}`}>
      <p className="value text">{props.rowData.fullName + ', '} <span>{timestampToDate(props.rowData.timestamp)}</span></p>
      </div>
      <div className="listContent" key={`${props.index} ${props.rowData.message}`}>
        <p className="value">{props.rowData.message}</p>
      </div>
    </div>
    </>
  )
}

export default MessageContainer
