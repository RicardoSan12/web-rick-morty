import React, { useRef, useState, useEffect } from 'react';
import './ListContent.css';
import { Link } from 'wouter';

import useSearch from '../../hooks/useSearch';

const ListContent = (props) => {
  const {
    image = '',
    name,
    residents = [],
    episode = '', 
    characters = [],
    id,
    menu,
  } = props;
  // const { setIndexCard, changeIndex } = useSearch();

  return (
    <li className="ListContent"> 
      <Link to={`/${menu}/${id}`} className="link-card"></Link>
      {menu == 'character' ? (
        <>
          {image && <img src={image} alt={name} />}
          <h3>Personaje: <span>{name}</span></h3>
        </>
      ) : menu == 'location' ? (
        <>
          <img src={`${imgOfCard}${getIdC(residents[1])}.jpeg`} alt={name} />
          <h3>Locacion: <span>{name}</span></h3>
        </>
      ) : menu == 'episode' ? (
        <>
          <img src={`${imgOfCard}${getIdC(characters[4])}.jpeg`} alt={name} />
          <h3>
            Episodio: {episode && episode} | {name}
          </h3>
        </>
      ) : (
        <h3>Error no hay nada en {menu}</h3>
      )}
    </li>
  );
}; 

export default ListContent;

const imgOfCard = 'https://rickandmortyapi.com/api/character/avatar/';

const getIdC = (word = 'https://rickandmortyapi.com/api/character/1') => {
  let number = word;
  if (number.length == 45) return number.substring(number.length - 3);
  else if (number.length == 44) return number.substring(number.length - 2);
  else return number.substring(number.length - 1);
};
//Error in /~/src/components/ListContent/index.js (19:95)
// Cannot read properties of undefined (reading '0') : este error salia al pasar a la pagina location o episode,crep que era porque no le cargaban los datos a tiempo, coloque un array vacio a residens y character
