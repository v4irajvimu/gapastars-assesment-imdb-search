import React, { Dispatch, SetStateAction, useState } from "react";
import ISearchParams from "../interfaces/ISearchParams";
import "../styles/SearchHeader.scss";

interface SearchHeaderProps {
  setParams: Dispatch<SetStateAction<ISearchParams>>;
  resetFocusedMovie: () => void;
}

const SearchHeader = ({ setParams, resetFocusedMovie }: SearchHeaderProps) => {
  const [internalTerm, setInternalTerm] = useState("");

  /**
   * handling on search button press. setting search term into parent component state
   * and setting page number to 1 since it is a new results set.
   */
  const handleOnSearch = () => {
    setParams({ page: 1, term: internalTerm });
    resetFocusedMovie();
  };

  return (
    <div className="grid-container bottom-shadow header-container">
      <div className="grid header-wrapper">
        <div className="grid-item title-wrapper">
          <h3 id="search-title ">OMDB Search</h3>
        </div>
        <div className="grid-item input-wrapper">
          <span>Search a movie</span>
          <input
            type="text"
            value={internalTerm}
            onChange={(e) => setInternalTerm(e.target.value)}
          />
          <button className="btn-default" onClick={handleOnSearch}>
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
