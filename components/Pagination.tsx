import React, { useState } from "react";

interface PaginationProps {
  totalShorties: number;
  shortyPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const [buttonsPerPage] = useState(5);
  const [currentButtonPage, setCurrentButtonPage] = useState(1);
  const lastButtonPageIndex = currentButtonPage * buttonsPerPage;
  const firstButtonPageIndex = lastButtonPageIndex - buttonsPerPage;
  const pages: number[] = [];

  for (
    let i = 1;
    i <= Math.ceil(props.totalShorties / props.shortyPerPage);
    i++
  )
    pages.push(i);

  const maxButtonPage = pages.length / buttonsPerPage;
  const minButtonPage = 0;
  const minBtnPageToPaginate = buttonsPerPage * 2;

  return (
    <section className="btn-group">
      {pages.length >= minBtnPageToPaginate && (
        <button
          className="btn"
          onClick={() => {
            if (currentButtonPage - 1 <= minButtonPage) return;
            setCurrentButtonPage((prevPage) => prevPage - 1);
          }}
        >
          «
        </button>
      )}
      {pages
        .slice(firstButtonPageIndex, lastButtonPageIndex)
        .map((pageNumber) => (
          <button
            key={pageNumber}
            className={`btn ${
              props.currentPage === pageNumber ? "btn-primary" : ""
            }`}
            onClick={() => {
              props.setCurrentPage(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        ))}
      {pages.length >= minBtnPageToPaginate && (
        <button
          className="btn"
          onClick={() => {
            console.log(currentButtonPage + 1);
            console.log(maxButtonPage);
            if (currentButtonPage + 1 > maxButtonPage) return;
            setCurrentButtonPage((prevPage) => prevPage + 1);
          }}
        >
          »
        </button>
      )}
    </section>
  );
};

export default Pagination;
