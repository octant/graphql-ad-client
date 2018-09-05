import React from "react";
import { graphql } from "react-apollo";

import { USER_INFORMATION } from "../queries";

const ShowUser = ({ data: { error, loading, directoryEntry } }) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div key={directoryEntry.sAMAccountName}>
      <h3>{directoryEntry.displayName}</h3>
    </div>
  );
};

const WithDirectoryEntry = graphql(USER_INFORMATION, {
  options: props => ({
    variables: { username: props.match.params.username },
    fetchPolicy: "cache-and-network"
  })
});

export default WithDirectoryEntry(ShowUser);
