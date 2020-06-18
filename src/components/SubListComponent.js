import React from 'react';
import { timestampToDate } from '../js/utils';

function SubListComponent(props) {
  return (
    <>
    <div className="innerList">
      <div className="listContent" key={`${props.index} ${props.rowData.timestamp}`}>
        <label>Timestamp: </label>
        <p className="value text">{timestampToDate(props.rowData.timestamp)}</p>
      </div>
      <div className="listContent" key={`${props.index} ${props.rowData.fullName}`}>
        <label>FullName: </label>
        <p className="value text">{props.rowData.fullName}</p>
      </div>
      <div className="listContent" key={`${props.index} ${props.rowData.message}`}>
        <label>Message: </label>
        <p className="value">{props.rowData.message}</p>
      </div>  </div>
    </>
  )
}

export default SubListComponent
