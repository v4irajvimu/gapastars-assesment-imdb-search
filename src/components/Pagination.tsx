/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Dispatch, SetStateAction } from "react";
import "../styles/Pagination.scss";

interface Props {
  totalResults: number;
  activePageNumber: number;
  setActivePageNumber: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  totalResults,
  activePageNumber,
  setActivePageNumber,
}: Props) => {
  const PAGE_SIZE = 10;
  const numberOfPages = Math.ceil(totalResults / PAGE_SIZE);

  return (
    <div className="grid">
      <div className="grid-item grid-item-xs-12 total-amount-wrapper">
        <p>
          Total amount of items: <span>{totalResults}</span>
        </p>
      </div>
      <div className="grid-item grid-item-xs-12 pagination-wrapper">
        {totalResults > 0 && (
          <div className="pagination">
            <button
              onClick={() => {
                setActivePageNumber(
                  activePageNumber - 1 > 0 ? activePageNumber - 1 : 1
                );
              }}
              disabled={activePageNumber === 1}
            >
              &laquo;
            </button>

            {Array.from(Array(numberOfPages).keys()).map((i) => (
              <button
                key={i}
                className={i + 1 === activePageNumber ? "active" : ""}
                onClick={() => {
                  setActivePageNumber(i + 1);
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => {
                setActivePageNumber(
                  activePageNumber + 1 < numberOfPages
                    ? activePageNumber + 1
                    : numberOfPages
                );
              }}
              disabled={activePageNumber === numberOfPages}
            >
              &raquo;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pagination;
