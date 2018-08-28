import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://aph-dev5/Plasma/api/GraphQL",
  credentials: "include"
});

export default client;
