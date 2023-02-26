import React from 'react';
import './style.css';
import { Link } from 'wouter';

const ButtonComponent = ({ children, href, onClick, active, btn }) => {
  const className = `link ${active ? 'link--active' : ''} ${btn ? 'link--btn' : ''}`;
  return href ? (<Link to={href} className={className}>{children}</Link>) : 
  <button className={className} onClick={onClick}>{children}</button>  
};
export default ButtonComponent;
 