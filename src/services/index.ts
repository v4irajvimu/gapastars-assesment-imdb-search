import axios from "axios";
import ISearchParams from "../interfaces/ISearchParams";
import ISearchResponse from "../interfaces/ISearchResponse";

const OMDB_URL = `${process.env.REACT_APP_OMDB_BASE_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

const searchMovies = (term: string, page: number) =>
  axios.get(`${OMDB_URL}&type=movie&s=${term}&page=${page}`);

export const getMovieByImdbId = (imdbId: string) =>
  axios.get(`${OMDB_URL}&i=${imdbId}`);

export const fetchSearchedFilms = async ({
  term,
  page,
}: ISearchParams): Promise<ISearchResponse> => {
  if (term) {
    const results = await searchMovies(term, page);
    return results.data;
  } else {
    return { Error: "", Response: "", Search: [], totalResults: "0" };
  }
};
