import React from "react";
import IMovie, { IMovieRating } from "../interfaces/IMovie";
import "../styles/DetailedMovie.scss";

interface DetailedMovieProps {
  movie: IMovie;
}

const DetailedMovie = ({ movie }: DetailedMovieProps) => {
  const { Poster, Title, Year, Plot, Actors, Ratings } = movie;
  return (
    <div className="grid" id="detailed-movie">
      <div className="grid-item grid-item-xs-12">
        <div className="movie-card-wrapper bottom-shadow">
          <div className="poster-wrapper">
            {Poster !== "N/A" ? (
              <img src={Poster} alt={Title} />
            ) : (
              <span>Poster not available!</span>
            )}
          </div>
          <div className="details-wrapper">
            <div className="top-section">
              <div className="info-wrapper">
                <p className="card-title">{Title}</p>
              </div>
              {Plot && (
                <div className="info-wrapper">
                  <p className="card-info-label">Plot</p>
                  <p className="card-info">{Plot}</p>
                </div>
              )}
              {Actors && (
                <div className="info-wrapper">
                  <p className="card-info-label">Actors</p>
                  <p className="card-info">{Actors}</p>
                </div>
              )}
              {Ratings.length > 0 && (
                <div className="info-wrapper">
                  <p className="card-info-label">Ratings</p>
                  <ul>
                    {Ratings.map(
                      ({ Value, Source }: IMovieRating, index: number) => (
                        <li key={index}>
                          <p className="card-info">{Actors}</p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
            <div className="bottom-section">
              <p className="card-year">{Year}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedMovie;
