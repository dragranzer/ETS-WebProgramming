import { ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://ivan-mini-project.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "2iAZHTMEdK42S67iEN5gI797NqU6zb4l3LrvqAnmggmkoNw7Bx2QP3UfEwAIfLK0",
  },
});

const wsLink = new WebSocketLink({
  uri: "wss://ivan-mini-project.hasura.app/v1/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "2iAZHTMEdK42S67iEN5gI797NqU6zb4l3LrvqAnmggmkoNw7Bx2QP3UfEwAIfLK0",
      },
    },
  },
});
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

export default client