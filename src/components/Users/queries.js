import gql from "graphql-tag";

export const ALL_AD_USERS = gql`
  query allADUsers {
    users {
      sAMAccountName
      displayName
    }
  }
`;

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

export const SELECTED_USER = gql`
  query selectedUser {
    appState @client {
      selectedUser
    }
  }
`;

export const UPDATE_AD_INFORMATION = gql`
  mutation updateADUser($id: String!, $user: ADUserInput!) {
    updateADUser(id: $id, user: $user) {
      sAMAccountName
    }
  }
`;

export const USER_INFORMATION = gql`
  query userInformation($username: String!) {
    directoryEntry(username: $username) {
      department
      description
      displayName
      givenName
      physicalDeliveryOfficeName
      sAMAccountName
      sN
      telephoneNumber
      title
    }
  }
`;
