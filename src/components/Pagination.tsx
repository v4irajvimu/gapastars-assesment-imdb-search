import React from "react";
import "../styles/Pagination.scss";

interface Props {
  totalResults: number;
  activePageNumber: number;
  setActivePageNumber: (page: number) => void;
}

const Pagination = ({
  totalResults,
  activePageNumber,
  setActivePageNumber,
}: Props) => {
  const PAGE_SIZE = 10;
  const numberOfPages = Math.ceil(totalResults / PAGE_SIZE);

  const getPageList = (activePage: number, totalPages: number) => {
    const paginatedList = [{ value: 1, label: "1", isDot: false }];
    for (let starting = activePage - 2; starting < activePage; starting++) {
      if (starting > 1) {
        paginatedList.push({
          value: starting,
          label: `${starting}`,
          isDot: false,
        });
      }
    }
    if (activePage !== 1) {
      paginatedList.push({
        value: activePage,
        label: `${activePage}`,
        isDot: false,
      });
    }

    for (let ending = activePage + 1; ending <= activePage + 2; ending++) {
      if (ending < totalPages) {
        paginatedList.push({
          value: ending,
          label: `${ending}`,
          isDot: false,
        });
      }
    }
    if (paginatedList[paginatedList.length - 1].value !== totalPages) {
      paginatedList.push({
        value: totalPages,
        label: `${totalPages}`,
        isDot: false,
      });
    }
    let finalList: {
      value: number;
      label: string;
      isDot: boolean;
    }[] = [];
    paginatedList.forEach((paginatedItem, index) => {
      finalList.push(paginatedItem);
      if (
        paginatedList.length > 1 &&
        index === 0 &&
        paginatedItem.value + 2 <= paginatedList[index + 1].value
      ) {
        finalList.push({ value: -1, label: "...", isDot: true });
      }

      if (
        paginatedList.length > 1 &&
        index === paginatedList.length - 2 &&
        paginatedItem.value + 2 <= paginatedList[index + 1].value
      ) {
        finalList.push({ value: -2, label: "...", isDot: true });
      }
    });

    return finalList;
  };

  return (
    <div className="grid">
      <div className="grid-item grid-item-xs-12 total-amount-wrapper">
        <p>
          Total amount of items: <span>{totalResults}</span>
          <small> (Maximum number of movies per page is 10) </small>
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
            {getPageList(activePageNumber, numberOfPages).map(
              ({ isDot, label, value }) => (
                <button
                  key={value}
                  className={value === activePageNumber ? "active" : ""}
                  onClick={() => {
                    setActivePageNumber(value);
                  }}
                  disabled={isDot}
                >
                  {label}
                </button>
              )
            )}
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
