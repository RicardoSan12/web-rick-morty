import { useState, useEffect, useRef, useCallback } from 'react';

function useSearch() {
  const [search, updateSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
      return;
    }

    if (search === '') {
      setError('No se puede buscar una película vacía');
      return;
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número');
      return;
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres');
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

import getCards from '../services/getCards';
import { getParams, saveKeywordLocalStorage, sections } from '../utils';

const initialState = {
  loading: false,
  cards: [],
  totalPages: 20,
  currentPage: 1,
};

// 

export default function useCards({ section = 'location', search }) {
  const [state, setState] = useState(initialState);
  const previousSearch = useRef(search)

  const searchCards = useCallback(debounce( async (param) => {
    if (previousSearch.current === param) return 
    try{
      setState((prevState) => ({ ...prevState, loading: true }));
      const { cards, pages } = await getCards({ section, currentPage, ...param })
      setState(prevState => ({...prevState, cards, totalPages: pages}))
      pushLocation(param)
    }catch(e){}
    finally{
      setState(prevState => ({...prevState, loading: false}))
    }
  },2000), [currentPage, section])


  const saveSearch = (param) => {
    const [key, value] = Object.entries(param)
    const url = `${key}-${value}`
    const searched = `${key}: ${value}`
    return {url, searched}
  }
  

  // const { sectionName } = sections.find(({ name }) => name === section);
  // let query = { name: `${sectionName} ${keyword}` };
  let query = { name: `${section}: ${keyword}` };
  const saveKeyword = () => {
    query.url = `/${section}/name-${keyword}`;
    pushLocation(query.url);
    saveKeywordLocalStorage(query);
  };

  const getPageButtons = (range = 2) => {
    let buttons = [0];
    for (let num = 1; num < range + 1; num++) {
      if (totalPages - num > currentPage) buttons = [...buttons, num];
      if (currentPage > 1) buttons = [-num, ...buttons];
    }
    return buttons;
  };

  const changePage = ({ pageNumber }) =>
    setState((prevState) => ({ ...prevState, currentPage: pageNumber }));

  return {
    ...state,
    searchCards,
    changePage,
  };
}
 
function SearchFormer({ searchCard }) {
  const [search, setSearch] = React.useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (search !== '') return searchCard({ name: search });
  };

  const handleChange = ({ target }) => {
    setSearch(target.value.toLocaleLowerCase());
    searchCard({ name: search });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__entry">
        <input
          type="text"
          id="search"
          placeholder="Rick Sanchez or morty..."
          autoComplete="off"
          value={search}
          onChange={handleChange}
        />
      </div>
      <button className="search-form__submit">buscar</button>
    </form>
  );
}/* rgb(22, 24, 83) 

| rgb(41, 44, 109) 

| rgb(250, 237, 240) 

| rgb(236, 37, 90) */