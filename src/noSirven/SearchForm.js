import React from 'react';
import './SearchForm.css';
import { useLocation } from 'wouter';

import useSearch from '../../hooks/useSearch';
import useNewSearch from '../../hooks/useNewSearch';

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
} 

const SearchForm = ({ cardValue, onSearchCard, onSubmitKeyword }) => {
  // const [onSumit] = useNewSearch({section:'character'})
  // const onCheck = (evt) => debounce(console.log(evt.target.value), 1000)
  const [_, pushLocation] = useLocation();
  const onSubmitValue = (evt) => {
    evt.preventDefault();
    pushLocation(`character/name-${cardValue}`);
  };

  return (
    <form className="search-form" onSubmit={onSubmitKeyword}>
      <div className="search-form__entry">
        <input
          type="text"
          id="search"
          placeholder="Rick Sanchez or morty..."
          autoComplete="off"
          onChange={onSearchCard}
          value={cardValue}
        />
      </div>
      <button className="search-form__submit">BUSCAR</button>
    </form>
  );
};
export default SearchForm;