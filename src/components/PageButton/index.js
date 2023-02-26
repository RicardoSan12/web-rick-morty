import React from 'react'
import Button from '../Button'
const PageButtons = ({ currentPage, changePage, newPage }) => {
  const pageNumber = currentPage + newPage;
  return (
    <Button
      onClick={() => changePage({ pageNumber })}
      active={!newPage}
      btn
    >
      {pageNumber}
    </Button>
  );
}
export default PageButtons