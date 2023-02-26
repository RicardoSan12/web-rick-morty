import React from 'react';
import useSingleCard from '../../hooks/useSingleCard';
import { CardDetail } from '../../components/CardDetail';
import ListOfCards from '../../components/ListOfCards';
import Spinner from '../../components/Spinner';
import Icon from '../../components/Icon';

const nombre = {
  character: 'personaje',
  location: 'localización',
  episode: 'nombre del episodio',
};

const Detail = ({ params = {} }) => {
  const { id, section } = params;
  const [card, loading] = useSingleCard({ section, id });

  const { image, name, ...rest } = card;
  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="card-detail">
          {image && <img src={image} className="card-detail__image" />}
          <h2 className="card-detail__title">
            {nombre[section]}: <span>{name}</span>
          </h2>
          <Icon path={section} size={350} classname="card-detail__mark" />
          <ListOfCards flexbox space={8}>
            <CardDetail {...rest} section={section} />
          </ListOfCards>
        </div>
      )}
    </section>
  );
};
export default Detail;

const tag = () => {};
