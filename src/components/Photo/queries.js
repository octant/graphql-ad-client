import gql from "graphql-tag";

export const SELECTED_USER = gql`
  query selectedUser {
    appState @client {
      selectedUser
    }
  }
`;
