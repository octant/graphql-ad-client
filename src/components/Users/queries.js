import gql from "graphql-tag";

export const ALL_AD_USERS = gql`
  query allADUsers {
    users {
      sAMAccountName
      displayName
    }
  }
`;

export const SELECT_USER = gql`
  mutation selectUser($username: String) {
    selectUser(username: $username) @client
  }
`;

export const SELECTED_USER = gql`
  {
    selectedUser @client
  }
`;
