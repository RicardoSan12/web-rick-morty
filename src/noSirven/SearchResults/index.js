import React, { useState, useEffect } from 'react';
// import './style.css';
import useCards from '../../hooks/useCards';
import Card from '../../components/Card';
import ListOfCards from '../../components/ListOfCards';
import getCards from '../../services/getCards';

const SearchResults = ({ params = {} }) => {
  const { site: section, keyword: name } = params;
  const { cards, loading } = useResults({ section, name });

  return (
    <>
      <h2>Resultados de {name}</h2>

      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <ListOfCards>
          {cards.map((card) => (
            <Card {...card} menu={section} />
          ))}
        </ListOfCards>
      )}
    </>
  );
};
export default SearchResults;

const useResults = ({ section, name }) => {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);

  const [key, value] = name.split('-');
  if (value?.includes('%20')) value = value.split('%20').join(' ');
  name = { [key]: value };

  useEffect(() => {
    setLoading(true);
    getCards({ section, page, ...name }).then((cards) => {
      setCards(cards);
      setLoading(false);
    });
  }, [page, section]);

  const handleSubmit = () => {
    push(`${section}/search/name-${name}`);
    // push(`${section}/search/name-${name.split(' ').join('_')}`);
    localStorage.setItem(
      'lastKeywords',
      JSON.stringify([name, ...lastKeywords])
    );
  };
  return {
    loading,
    cards,
    page,
    setPage,
  };
};
