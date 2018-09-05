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

export const MY_AD_INFORMATION = gql`
  query myInformation {
    my {
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

export const UPDATE_AD_INFORMATION = gql`
  mutation UpdateADUser($id: String!, $user: ADUserInput!) {
    updateADUser(id: $id, user: $user) {
      sAMAccountName
    }
  }
`;
