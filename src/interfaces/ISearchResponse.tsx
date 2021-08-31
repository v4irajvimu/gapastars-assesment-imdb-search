import ISearchResponseItem from "./ISearchResponseItem";

export default interface ISearchResponse {
  Search: ISearchResponseItem[];
  totalResults: string;
  Response: string;
  Error: string;
}
