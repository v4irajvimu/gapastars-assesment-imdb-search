import React, { Dispatch, SetStateAction } from "react";
import "../styles/SearchHeader.scss";

interface SearchHeaderProps {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

const SearchHeader = ({ term, setTerm, onSearch }: SearchHeaderProps) => {
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
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button className="btn-default" onClick={onSearch}>
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
