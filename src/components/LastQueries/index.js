import React from 'react';
import Button from '../Button';
import ListOfCards from '../ListOfCards';

export default function LastQueries() {
  const keywords = JSON.parse(localStorage.getItem('lastQueries')) || [];
  if (!keywords.length) return null;
  return (
    <>
      <h2>Ultimas Busquedas</h2>
      <ListOfCards space={8} flexbox>
        {Array.from(keywords, ({ name, url }, i) => (
          <Button href={url} key={i}>
            {name} 🖍
          </Button>
        ))}
      </ListOfCards>
    </>
  );
}
