import React, { Dispatch, SetStateAction } from "react";
import ISearchResponseItem from "../interfaces/ISearchResponseItem";
import "../styles/SearchResults.scss";

interface SearchResultsProps {
  list: ISearchResponseItem[];
  focusedMovieId: string;
  setFocusedMovieId: Dispatch<SetStateAction<string>>;
}

const SearchResults = ({
  list,
  focusedMovieId,
  setFocusedMovieId,
}: SearchResultsProps) => {
  return (
    <div className="grid">
      {list.map(({ Title, Poster, imdbID, Year }: ISearchResponseItem) => (
        <div className="grid-item grid-item-xs-12 grid-item-sm-6">
          <div
            className={`card-wrapper bottom-shadow ${
              focusedMovieId === imdbID ? "active" : ""
            }`}
          >
            <div className="poster-wrapper">
              {Poster !== "N/A" ? (
                <img src={Poster} alt={Title} />
              ) : (
                <span>Poster not available!</span>
              )}
            </div>
            <div className="details-wrapper">
              <div className="top-section">
                <p className="card-title">{Title}</p>
              </div>
              <div className="bottom-section">
                <p className="card-year">{Year}</p>
                <button
                  className="card-btn btn-default"
                  onClick={() =>
                    setFocusedMovieId(focusedMovieId === imdbID ? "" : imdbID)
                  }
                >
                  DETAILS
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
