import React from 'react';

const reference = {
  episode: {
    name: 'nombre del episodio',
    episode: 'episodio',
    air_date: 'fecha de estreno',
    characters: 'personajes',
  },
  location: {
    name: 'localización',
    dimension: 'dimensión',
    type: 'tipo',
    residents: 'residentes',
  },
  character: {
    name: 'personaje',
    gender: 'genero',
    species: 'especie',
    status: 'estado',
    location: 'lugar de origen',
    episode: 'episodios',
    type: 'tipo',
  },
};

const hasLink = ['gender', 'species', 'status', 'type', 'location'];

const CardDetaile = ({ section = 'episode', ...card }) =>
  Object.entries(card).map(([key, value]) => {
    const location = value.name;
    let href =
      hasLink.includes(key) && `/${section}/${key}-${value?.toLowerCase()}`;
    if (location) {
      const locationUrl = `/location/card/${
        getAvatarOrImage(value.url).avatarId
      }`;
      href = locationUrl;
      value = location;
    }

    if (value !== 'unknown')
      return (
        <h4 className="card-detail__title">
          {reference[section][key] && `${reference[section][key]}:`}

          {!Array.isArray(value) ? (
            !href ? (
              <span>{value}</span>
            ) : (
              <Button href={href}>{value}</Button>
            )
          ) : (
            <ListOfCards flexbox space={3}>
              {value.map((avatarUrl) => {
                const { avatarId, image } = getAvatarOrImage(avatarUrl),
                  href = section !== 'character' ? 'character' : 'episode';
                return (
                  <li className="card-detail__item" key={avatarId}>
                    <Button href={`/${href}/card/${avatarId}`}>
                      <Icon path={href} size={25} class="back-img" />
                      {href === 'episode' ? avatarId : <img src={image} />}
                    </Button>
                  </li>
                );
              })}
            </ListOfCards>
          )}
        </h4>
      );
  });