import React from 'react';
import './style.css';

import Button from '../Button';
import ListOfCards from '../ListOfCards';
import TagLink from './TagLink'

import { getAvatarOrImage } from '../../utils';
import { sectionTitles } from '../../constants'

const hasLink = ['gender', 'species', 'status', 'type'];

export  const CardDetail = ({ section = 'episode', ...card }) =>
Object.entries(card).map(([key, value]) => { 
  if (['unknown', ''].includes(value)) return null;

  const location = value.name;
  let href = hasLink.includes(key) && `/${section}/${key}-${value?.toLowerCase()}`;
  if (location) {
    const locationUrl = `/location/card/${getAvatarOrImage(value.url).avatarId}`;
    href = locationUrl;
    value = location;
  }
  return (
    <h4 className="card-detail__subtitle">
      {sectionTitles[section][key]}:
      {!Array.isArray(value) ? (
        !href ? (<span> {value}</span>) : (<Button href={href}>{value}</Button>)
      ) : (
        <ListOfCards flexbox space={14}>
          {value.map((avatarUrl) => {
          const { avatarId:id, image } = getAvatarOrImage(avatarUrl)
          return <TagLink section={section} id={id} key={id} image={image} />})}
        </ListOfCards>
      )}
    </h4>
  );
});


