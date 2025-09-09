import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import fetch from "cross-fetch";

const uri = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT;

console.log('NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT: ' + uri);

if (!uri || !/^https?:\/\//.test(uri)) {
  throw new Error(
    `NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT is missing or not absolute. Got: "${uri ?? "undefined"}"`
  );
}

export function getClient(headers: Record<string, string> = {}) {
  return new ApolloClient({
    link: new HttpLink({ uri, fetch, headers }),
    cache: new InMemoryCache(),
  });
}