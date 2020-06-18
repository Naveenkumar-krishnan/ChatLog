import React from 'react'

function Avatar(props) {
  return (
    <div className="avatar" title={props.email}>
        <img src={props.avatar} alt="avatar"/>
    </div>
  )
}

export default Avatar