import React, { useContext } from 'react';
import './Home.css';
import useSearch from '../../hooks/useSearch';
import Card from '../../components/Card';

import { TemaContext } from '../../contexts/Theme';

const Home = () => {
  const { cards, handleNext } = useSearch('character');
  const { temita, changeTemita, temaPrueba } = useContext(TemaContext);
  return (
    <section className={`Home ${temita}`}>
      <div className="modal"></div>
      <div className="Home-history">
        <h2 onClick={changeTemita}>Ultimas Busquedas</h2>
        {temita}
        {/* <TemaContext.Consumer>
          {(value) => <h3>{value.temita}</h3>}
        </TemaContext.Consumer> */}
      </div>
      <div className="Home-recoment">
        <h2>Cosas Recomendadas</h2>
        <button onClick={handleNext}>Siguiente</button>
        <ul className="ListOfCards">
          {cards.map((item) => {
            return <Card {...item} menu="character" />;
          })}
        </ul>
      </div>
    </section>
  );
};

export default Home;

// 2 recomedaciones personajes, locaciones, Episodios, Especies
const recoment = [
  'https://rickandmortyapi.com/api/character/avatar/260.jpeg',
  'https://rickandmortyapi.com/api/character/avatar/28.jpeg',
  'https://rickandmortyapi.com/api/character/avatar/220.jpeg',
  'https://rickandmortyapi.com/api/character/avatar/260.jpeg',
];
