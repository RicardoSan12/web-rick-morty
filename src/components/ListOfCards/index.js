import React from 'react';
import './style.css';

const ListOfCards = ({ children, space = 16, flexbox }) => {
  const classname = flexbox ? 'list-cards--flex' : 'list-cards--grid',
    spaceStyle = { '--space': `${space}px` };
  return (
    <ul className={classname} style={spaceStyle}>
      {children}
    </ul>
  );
};
export default ListOfCards;
