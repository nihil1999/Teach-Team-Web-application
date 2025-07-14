import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "http://localhost:3005/graphql", // This is where our server is listening for GraphQL requests
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
