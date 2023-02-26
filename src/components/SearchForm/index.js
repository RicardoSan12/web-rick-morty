import React from 'react';
import './SearchForm.css';

export default function SearchForm({ keyword, changeKeyword, saveKeyword }) {
  const handleSubmit = (evt) => {
      evt.preventDefault();
      if (keyword !== '') saveKeyword();
    },
    handleChange = ({ target }) =>
      changeKeyword({ keyword: target.value.toLocaleLowerCase() });
  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__entry">
        <input
          type="text"
          id="search"
          placeholder="Rick Sanchez or morty..."
          autoComplete="off"
          value={keyword}
          onChange={handleChange}
        />
      </div>
      <button className="search-form__submit">buscar</button>
    </form>
  );
}
