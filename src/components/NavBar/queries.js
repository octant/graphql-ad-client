import gql from "graphql-tag";

export const MY_NAME = gql`
  query myDisplayName {
    my {
      displayName
      sAMAccountName
    }
  }
`;

export const SELECT_USER = gql`
  mutation selectUser($username: String) {
    selectUser(username: $username) @client
  }
`;
