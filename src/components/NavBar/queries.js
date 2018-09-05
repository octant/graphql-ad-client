import gql from "graphql-tag";

export const MY_NAME = gql`
  query myDisplayName {
    my {
      displayName
      sAMAccountName
    }
  }
`;
