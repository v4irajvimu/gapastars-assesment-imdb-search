import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import IMovie from "../interfaces/IMovie";
import ISearchResponse from "../interfaces/ISearchResponse";
import { getMovieByImdbId, searchMovies } from "../services";
import "../styles/common.scss";
import "../styles/grid.scss";
import { MessageTypes } from "../utils/enums";
import DetailedMovie from "./DetailedMovie";
import Message from "./Message";
import Pagination from "./Pagination";
import SearchHeader from "./SearchHeader";
import SearchResults from "./SearchResults";

interface ImdbSearchProps {}

const ImdbSearch = (props: ImdbSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [focusedMovieId, setFocusedMovieId] = useState<string>("");
  const [focusedMovieData, setFocusedMovieData] = useState<IMovie | null>(null);
  const [movies, setMovies] = useState<ISearchResponse>({
    Search: [],
    Response: "",
    totalResults: "",
    Error: "",
  });

  const handleOnSearch = useCallback(() => {
    setFocusedMovieId("");
    setFocusedMovieData(null);
    searchMovies(searchTerm, activePageNumber).then(
      (response: AxiosResponse) => {
        if (response?.data) {
          setMovies((prevMovie) => ({ ...prevMovie, ...response.data }));
        }
      }
    );
  }, [activePageNumber, searchTerm]);

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

  useEffect(() => {
    if (searchTerm) {
      handleOnSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePageNumber]);

  useEffect(() => {
    if (focusedMovieId) {
      getMovieDetails(focusedMovieId);
    } else {
      setFocusedMovieData(null);
    }
  }, [focusedMovieId]);

  useEffect(() => {
    setActivePageNumber(1);
  }, [searchTerm]);

  return (
    <>
      <SearchHeader
        term={searchTerm}
        setTerm={setSearchTerm}
        onSearch={handleOnSearch}
      />
      <div className="grid-container ">
        {/* Error message */}
        {movies.Response === "False" && (
          <Message type={MessageTypes.Error} message={movies.Error} />
        )}

        {/* Welcome message */}
        {movies.Response === "" && movies.Search.length === 0 && (
          <Message
            type={MessageTypes.Info}
            message="Welcome to OMDB Search, search something in the bar above!"
          />
        )}

        {focusedMovieData && <DetailedMovie movie={focusedMovieData} />}

        {movies.Response === "True" && movies.Search.length > 0 && (
          <>
            {/* Search results */}
            <SearchResults
              list={movies.Search}
              focusedMovieId={focusedMovieId}
              setFocusedMovieId={setFocusedMovieId}
            />

            {/* Pagination section */}
            <Pagination
              activePageNumber={activePageNumber}
              totalResults={Number(movies.totalResults)}
              setActivePageNumber={setActivePageNumber}
            />
          </>
        )}
      </div>
    </>
  );
};

export default ImdbSearch;
