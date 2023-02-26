import React from 'react';
import { Link } from 'wouter';
import './style.css';
import Icon from '../Icon';
import { useExtractCard } from './useExtractCard';

const Card = ({ card, section, reverse }) => {
  const { iconType, image, title, url } = useExtractCard({ card, section });
  const reverseCard = reverse ? 'card--reverse' : '';
  return (
    <Link to={url} className={`card ${reverseCard}`}>
      <img src={image} alt={title} className="card__image" />
      <h3 className="card__title"><Icon path={iconType} classname="card__icon" />{title}</h3>
    </Link>
  );
};

export default Card;
