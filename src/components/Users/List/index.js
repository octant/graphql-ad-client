import "react-table/react-table.css";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import React from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";

import { ALL_AD_USERS } from "../queries";

class ListUsers extends React.Component {
  render() {
    const {
      data: { error, loading, users }
    } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <ReactTable
        data={users}
        filterable
        columns={[
          {
            accessor: "displayName",
            Header: "Name",
            filterAll: true,
            filterMethod: (filter, rows) =>
              matchSorter(rows, filter.value, { keys: ["displayName"] })
          },
          {
            Header: "Actions",
            accessor: "sAMAccountName",
            filterable: false,
            Cell: props => (
              <span>
                <Link to={`/users/${props.value}`}>Show</Link>
                {" | "}
                <Link to={`/users/${props.value}/edit`}>Edit</Link>
              </span>
            )
          }
        ]}
      />
    );
  }
}

export default graphql(ALL_AD_USERS)(ListUsers);
