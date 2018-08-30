import gql from "graphql-tag";

export const MY_AD_INFORMATION = gql`
  query myInformation {
    my {
      sAMAccountName
      title
      displayName
      givenName
      sN
      department
      telephoneNumber
      physicalDeliveryOfficeName
    }
  }
`;

export const USER_INFORMATION = gql`
  query userInformation($username: String!) {
    directoryEntry(username: $username) {
      sAMAccountName
      title
      displayName
      description
      givenName
      sN
      department
      telephoneNumber
      physicalDeliveryOfficeName
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
