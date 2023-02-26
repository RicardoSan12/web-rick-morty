import React from 'react';

const lugar = {
  character: {},
  location: {}, 
  episode: {},
};

// const idioma = {
//   es: {
// name: 'personaje',
// gender: 'genero',
// species: 'especie',
// status: 'estado',
// location: 'lugar de origen',
// episode: 'episodios',
// type: 'tipo',
//   },
//   en: {
//     name: 'character',
//     gender: 'gender',
//     species: 'specie',
//     status: 'status',
//     location: 'birthplace',
//     episode: 'episodes',
//     type: 'type',
//   },
// };

export const CardCharacter = ({
  card: {
    name,
    image,
    gender,
    species,
    status,
    location = { url: '' },
    episode: episodes = [],
    type,
  },
}) => (
  <div className="card-detail">
    <img src={image} alt={name} className="card-detail__image" />
    <h2 className="card-detail__title">
      Personaje: <span>{name}</span>
    </h2>
    <h4 className="card-detail__subtitle">
      {gender !== 'unknown' && (
        <>
          Genero:
          <Button
            href={`/character/gender-${gender}`}
            className="card-detail__link"
          >
            {gender}
          </Button>
        </>
      )}
      Especie:
      <Button
        href={`/character/species-${species}`}
        className="card-detail__link"
      >
        {species}
      </Button>
    </h4>

    <h4 className="card-detail__subtitle">
      {status && status !== 'unknown' && (
        <>
          Estado:
          <Button
            href={`/character/status-${status}`}
            className="card-detail__link"
          >
            {status}
          </Button>
        </>
      )}
      {type && [
        'Tipo: ',
        <Button href={`/character/type-${type}`} className="card-detail__link">
          {type}
        </Button>,
      ]}
    </h4>
    {location?.name !== 'unknown' && (
      <h4 className="card-detail__subtitle">
        Lugar de origen:
        <Button
          href={`/location/card/${getAvatarOrImage(location?.url).avatarId}`}
          className="card-detail__link"
        >
          {location?.name}
        </Button>
      </h4>
    )}

    <h4 className="card-detail__subtitle">Episodios: </h4>
    <ul className="card-detail__list">
      {episodes.map &&
        episodes.map((episode) => {
          const { avatarId } = getAvatarOrImage(episode);
          return (
            <li className="card-detail__item">
              <Button
                href={`/episode/card/${avatarId}`}
                className="card-detail__link"
              >
                🎞 {avatarId}
              </Button>
            </li>
          );
        })}
    </ul>
  </div>
);
const idioma = {
  es: {
    name: 'localización',
    dimension: 'dimensión',
    residents: 'residentes',
    type: 'tipo',
  },
  en: ['location', 'dimesion', 'residents', 'type'],
};
export const CardLocation = ({
  card: { name, dimension, residents, type },
}) => (
  <div className="card-detail">
    <h2 className="card-detail__title">
      Locación: <span className="">{name}</span>
    </h2>
    <h4 className="card-detail__subtitle">
      {dimension !== 'unknown' && (
        <>
          Dimesion: <span>{dimension} </span>
        </>
      )}
      Tipo: <Button href={`/location/type-${type}`}>{type}</Button>
    </h4>
    <h4 className="card-detail__subtitle">Residentes:</h4>
    <ul className="card-detail__list">
      {residents?.map((resident) => {
        const { image, avatarId } = getAvatarOrImage(resident);
        return (
          <li className="card-detail__item">
            <Button href={`/character/card/${avatarId}`}>
              <img src={image} alt="" lazy="load" />
            </Button>
          </li>
        );
      })}
    </ul>
  </div>
);
export const CardLocationmmm = ({ card = {} }) => {
  const data = Object.entries(card);
  return (
    <div className="card-detail">
      {data.map(([key, value]) => (
        <>
          {key === 'name' && (
            <h2 className="card-detail__title">
              {idioma.es[key]}: <span>{value}</span>
            </h2>
          )}
          {key !== 'name' && !Array.isArray(value) && (
            <h4 className="card-detail__subtitle">
              {idioma.es[key]} <span>{value} </span>
            </h4>
          )}
          {Array.isArray(value) && (
            <>
              <h4 className="card-detail__subtitle">{idioma.es[key]}</h4>
              <ul className="card-detail__list">
                {value.map((character) => {
                  console.log({ character });
                  const { avatarId, image } = getAvatarOrImage(character);
                  return (
                    <li className="card-detail__item">
                      <Button href={`/character/card/${avatarId}`}>
                        <img src={image} />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </>
      ))}
    </div>
  );
};
// const idioma = {
//   es: {
//     episode: 'episodio',
//     name: 'nombre del episodio',
//     air_date: 'fecha de estreno',
//     characters: 'personajes',
//   },
//   en: {
//     episode: 'episode',
//     name: 'name episode',
//     air_date: 'air date',
//     characters: 'characters',
//   },
// };

export const CardEpisodeeeee = ({
  card: { episode, name, air_date, characters = [] },
}) => (
  <div className="card-detail">
    <h2 className="card-detail__title">
      Episodio: <span>{episode}</span>
    </h2>
    <h4 className="card-detail__subtitle">
      Nombre del Episodio: <span>{name}</span>
    </h4>
    <h4 className="card-detail__subtitle">
      Fecha de Estreno: <span>{air_date}</span>
    </h4>
    <h4 className="card-detail__subtitle">
      Personajes que aparecieron:
      <ul className="card-detail__list">
        {characters.map((character) => {
          const { avatarId, image } = getAvatarOrImage(character);
          return (
            <li className="card-detail__item">
              <Button href={`/character/card/${avatarId}`}>
                <img src={image} />
              </Button>
            </li>
          );
        })}
      </ul>
    </h4>
  </div>
);
