import { request } from "graphql-request";

export const fetcher = (url: string, query: string, variables?: any) =>
  request(url, query, variables);
