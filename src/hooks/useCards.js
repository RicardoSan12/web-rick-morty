import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import getCards from '../services/getCards';
import { getParams, saveKeywordLocalStorage, sections } from '../utils';

const initialState = {
  loading: false,
  keyword: '',
  cards: [],
  currentPage: 1,
  totalPages: 20,
};

export default function useCards({ section = 'location', pathName = '' }) {
  const [state, setState] = useState(initialState);
  const { loading, keyword, cards, totalPages, currentPage } = state;
  const [, pushLocation] = useLocation();

  useEffect(
    () => setState((prevState) => ({ ...prevState, keyword: '' })),
    [section]
  );
  useEffect(() => {
    setState((prevState) => ({ ...prevState, currentPage: 1 }))
  },[section, pathName, keyword])

  const timeout = pathName ? 600 : 1500;
  useEffect(() => {
    const params = !keyword && pathName ? getParams(pathName) : { name: keyword };
    setState((prevState) => ({ ...prevState, loading: true }));
    const timer = setTimeout(() => {
      getCards({ section, page: currentPage, ...params }).then(
        ({ cards, pages }) => setState((prevState) => ({ ...prevState, cards, totalPages: pages, loading: false}))
      );
    }, timeout);
    return () => clearTimeout(timer);
  }, [section, currentPage, pathName, keyword]);

  const changeKeyword = ({ keyword }) => setState((prevState) => ({ ...prevState, keyword }));

  const { sectionName } = sections.find(({ name }) => name === section);
  let query = { name: `${sectionName} ${keyword}` };
  const saveKeyword = () => {
    query.url = `/${section}/name-${keyword}`;
    pushLocation(query.url);
    saveKeywordLocalStorage(query);
  };

  const getPageButtons = (range=2) => {
    let buttons = [0];
    if (section === 'episode') range = 1
    for(let num=1; num < range+1; num++){
      if (totalPages - num > currentPage) buttons=[...buttons, num]
      if (currentPage > 1) buttons = [-num,...buttons]
    }
    return buttons
  }

  const changePage = ({ pageNumber }) =>
    setState((prevState) => ({ ...prevState, currentPage: pageNumber }));

  return {
    loading,
    cards,
    keyword,
    currentPage,
    pageButtons: getPageButtons(),
    changeKeyword,
    saveKeyword,
    changePage,
  };
}
