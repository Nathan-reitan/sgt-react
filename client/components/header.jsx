import React from 'react';

function Header(props) {
  return (
    <div className='row header'>
      <h1>Reitan Student Grade Table</h1>
      <h1>Average <span className="badge badge-secondary">{props.average}</span></h1>
    </div>
  );
}

export default Header;
