import React, { useState, useEffect } from 'react';
import './CardContent.css';
import useSingleCard from '../../hooks/useSingleCard';

import { Link } from 'wouter';

// import useSearch from '../../hooks/useSearch';

//ListOfCards
const CardContent = ({ params = {} }) => {
  const { id, site } = params;
  const { cardInfo } = useSingleCard(id, site);

  switch (site) {
    case 'character':
      return <CardCharacter infoCard={cardInfo} />;
    case 'location':
      return <CardLocation infoCard={cardInfo} />;
    case 'episode':
      return <CardEpisode infoCard={cardInfo} />;
    default:
      return 'Error este lugar no existe';
  }
  // if (site === 'character') return <CardCharacter infoCard={cardInfo} />;
  // else if (site === 'location') {
  //   return (
  //     <>
  //       <CardLocation infoCard={cardInfo} />;{/* <ListContent /> */}
  //     </>
  //   );
  // } else if (site === 'episode') return <CardEpisode infoCard={cardInfo} />;
  // return 'no hay nada';
};

const CardGeneral = ({ children }) => {
  return <section>{children}</section>;
};

const CardLocation = ({ infoCard }) => (
  <div className="CardContentId">
    {infoCard && (
      <>
        <h2>
          Locación: <span>{infoCard.name}</span>
        </h2>
        <p>
          Dimesión: <span>{infoCard.dimension}</span> Tipo:{' '}
          <span>{infoCard.type}</span>
        </p>
        <p>Residentes:</p>
        <ul>
          {infoCard.residents.map((item) => (
            <Link to={`/character/${getIdCard(item)}`}>
              <img src={`${imgCard}${getIdCard(item)}.jpeg`} alt="" />
            </Link>
          ))}
        </ul>
      </>
    )}
  </div>
);

{
  /* <Link to={item}><img src={`${imgCard}${getIdCard(item)}.jpeg`} alt='' /></Link> */
  // <Link to={`/${menu}/${id}`} className="indexContent"></Link>
}

const CardEpisode = ({ infoCard }) => (
  <div className="CardContentId">
    {infoCard && (
      <>
        <h2>
          Episodio: <span>{infoCard.episode}</span>
        </h2>
        <p>
          Nombre del Episodio: <span>{infoCard.name}</span>{' '}
        </p>
        <p>
          Fecha de Estreno: <span>{infoCard.air_date}</span>
        </p>
        <p>Personajes que aparecieron:</p>
        <ul>
          {infoCard.characters.map((item) => (
            <a href={`/character/${getIdCard(item)}`}>
              <img src={`${imgCard}${getIdCard(item)}.jpeg`} alt="" />
            </a>
          ))}
        </ul>
      </>
    )}
  </div>
);

const CardCharacter = ({ infoCard }) => (
  <div className="CardContentId">
    {infoCard && (
      <>
        <img src={infoCard.image} alt={infoCard.name} />
        <h2>
          Personaje: <span>{infoCard.name}</span>
        </h2>
        <p>
          Genero: <span>{infoCard.gender}</span>
        </p>
        <p>
          Especie: <span>{infoCard.species}</span>
        </p>
        <p>
          Estado: <span>{infoCard.status}</span> Tipo:{' '}
          <span>{infoCard.type || 'No Hay'}</span>
        </p>
        <p>
          Lugar de origen: <span>{infoCard.location.name}</span>
        </p>

        <p>
          Episodios:{' '}
          {infoCard.episode.map((item, index) => (
            <span>
              {item} el indice{index}
            </span>
          ))}
        </p>
      </>
    )}
  </div>
);

export default CardContent;

const imgCard = 'https://rickandmortyapi.com/api/character/avatar/';

const getIdCard = (word = 'https://rickandmortyapi.com/api/character/1') => {
  let number = word;
  if (number.length == 45) return number.substring(number.length - 3);
  else if (number.length == 44) return number.substring(number.length - 2);
  else return number.substring(number.length - 1);
};

// const getImg = () => {

// }
