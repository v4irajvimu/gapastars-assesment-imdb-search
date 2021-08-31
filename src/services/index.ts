import axios from "axios";

const OMDB_URL = `${process.env.REACT_APP_OMDB_BASE_URL}?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

export const searchMovies = (term: string, page: number) =>
  axios.get(`${OMDB_URL}&type=movie&s=${term}&page=${page}`);

export const getMovieByImdbId = (imdbId: string) =>
  axios.get(`${OMDB_URL}&i=${imdbId}`);
