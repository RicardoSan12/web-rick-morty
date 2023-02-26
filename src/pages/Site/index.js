import React from 'react';
import './style.css';
import useCards from '../../hooks/useCards';

import Card from '../../components/Card';
import ListOfCards from '../../components/ListOfCards';
import SearchForm from '../../components/SearchForm';
import Spinner from '../../components/Spinner';
import PageButton from '../../components/PageButton';

const Site = ({ params }) => {
  const { section, name } = params;
  const {
    loading,
    cards,
    keyword,
    searched,
    currentPage,
    pageButtons,

    changeKeyword,
    saveKeyword,
    changePage,
  } = useCards({
    section,
    pathName: name,
  });

  return (
    <section className="site container">
      <h2 className="site__title">
        {section}
        {name && (
          <span className="site__searched">
            {name.replace('name-', '').replace('-', ': ')}
          </span>
        )}
      </h2>
      <SearchForm
        keyword={keyword}
        changeKeyword={changeKeyword}
        saveKeyword={saveKeyword}
      />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ListOfCards>
            {Array.from(cards, (card) => (
              <Card key={card.id} card={card} section={section} />
            ))}
          </ListOfCards>

          <ListOfCards flexbox>
            {pageButtons.map((newPage) => (
              <PageButton
                currentPage={currentPage}
                changePage={changePage}
                newPage={newPage}
              />
            ))}
          </ListOfCards>
        </>
      )}
    </section>
  );
};
export default Site;
