import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import IMovie from "../interfaces/IMovie";
import ISearchParams from "../interfaces/ISearchParams";
import ISearchResponse from "../interfaces/ISearchResponse";
import { fetchSearchedFilms, getMovieByImdbId } from "../services";
import "../styles/common.scss";
import "../styles/grid.scss";
import { MessageTypes } from "../utils/enums";
import DetailedMovie from "./DetailedMovie";
import Message from "./Message";
import Pagination from "./Pagination";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";

const ImdbSearch = () => {
  const [searchParams, setSearchParams] = useState<ISearchParams>({
    page: 1,
    term: "",
  });
  const [focusedMovieId, setFocusedMovieId] = useState<string>("");
  const [focusedMovieData, setFocusedMovieData] = useState<IMovie | null>(null);

  const { data: movies } = useQuery<ISearchResponse, Error>(
    ["movies", searchParams],
    () => fetchSearchedFilms(searchParams),
    {
      keepPreviousData: true,
    }
  );

  /**
   * Increasing/decreasing active page number.
   * @param page number Page number
   */
  const handleSetPage = (page: number) => {
    setSearchParams((prevParams) => ({ ...prevParams, page }));
  };

  /**
   * Get movie details by unique id and set inside the state. after that focus the detailed banner.
   * @param impdbId string Movie unique id
   */
  const getMovieDetails = (impdbId: string) => {
    getMovieByImdbId(impdbId).then((response: AxiosResponse) => {
      if (response?.data) {
        if (response.data.Response === "True") {
          setFocusedMovieData(response.data);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    });
  };

  /**
   * Callback function to reset focused movie. this will hide the movie detailed banner.
   */
  const resetFocusedMovie = () => {
    setFocusedMovieData(null);
    setFocusedMovieId("");
  };

  useEffect(() => {
    if (focusedMovieId) {
      // Fetching movie details when new film focused.
      getMovieDetails(focusedMovieId);
    } else {
      setFocusedMovieData(null);
    }
  }, [focusedMovieId]);

  return (
    <>
      {/* Search header section */}
      <SearchHeader
        setParams={setSearchParams}
        resetFocusedMovie={resetFocusedMovie}
      />
      <div className="grid-container ">
        {/* Alert message section */}
        {movies?.Response === "False" && (
          <Message type={MessageTypes.Error} message={movies?.Error} />
        )}

        {/* Welcome message section */}
        {movies?.Response === "" && movies?.Search.length === 0 && (
          <Message
            type={MessageTypes.Info}
            message="Welcome to OMDB Search, search something in the bar above!"
          />
        )}

        {/* Movie Details Section */}
        {focusedMovieData && <DetailedMovie movie={focusedMovieData} />}

        {movies?.Response === "True" && movies?.Search.length > 0 && (
          <>
            {/* Search results section */}
            <SearchResults
              list={movies?.Search}
              focusedMovieId={focusedMovieId}
              setFocusedMovieId={setFocusedMovieId}
            />

            {/* Pagination section */}
            <Pagination
              activePageNumber={searchParams.page}
              totalResults={Number(movies?.totalResults)}
              setActivePageNumber={handleSetPage}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ImdbSearch;
