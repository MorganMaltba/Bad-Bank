import React from 'react';

function Card(props) {

  function classes() {
    const bg = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    return 'card mb-3 ' + bg + txt;
  }
  // Checks for assigned classes via props and sets defaults if none are found.

  return (

    <div className={classes()} style={{ height: 1000 + 'px' }}>
      <div className="card-header" id="header">{props.header}</div>
      <div className="card-body">
        {props.title && (<div className="card-title" id="title">{props.title}</div>)}
        {props.text && (<div className="card-text" id="text">{props.text}</div>)}
        {props.body}
        {props.status && (<div id='createstatus'>{props.status}</div>)}
      </div>
    </div>
    
  );
};

export default Card;