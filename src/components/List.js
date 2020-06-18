import React from 'react';
import Avatar from './Avatar';
import SubListComponent from './SubListComponent';

function List({ data }) {
  return (
    <div>
      {data.map((rowData, index) => (
        <div className="list" key={`list-${index}`}>
          {rowData.avatar &&
            <div className="innerList">
              <Avatar avatar={rowData.avatar} email={rowData.email}/>
            </div>
          }
          <SubListComponent index={index} rowData={rowData}/>
        </div>
      ))}
    </div>
  )
}

export default List;