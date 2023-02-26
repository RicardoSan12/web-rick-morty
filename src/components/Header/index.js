import React from 'react';
import './style.css';
import Icon from '../Icon';
import Button from '../Button';
import { sections } from '../../utils';

const Header = () => (
  <nav className="navbar">
    <ul className="navbar__menu">
      {Array.from(sections, ({ name, sectionName, url }, index) => (
        <li className="navbar__item" key={index}>
          <Button href={url} btn>
            <h4 className="navbar__title">{sectionName}</h4>
            <Icon path={name} />
          </Button>
        </li>
      ))}
    </ul>
  </nav>
);
export default Header;
