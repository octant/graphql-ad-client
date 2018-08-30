import ApolloClient from "apollo-boost";

import { typedefs, defaults, resolvers } from "./app-state";

const client = new ApolloClient({
  uri: "http://aph-dev5/Plasma/api/GraphQL",
  credentials: "include",
  clientState: {
    typedefs,
    defaults,
    resolvers
  }
});

export default client;
