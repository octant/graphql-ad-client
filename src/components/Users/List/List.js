import React from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import { Link } from "react-router-dom";

const UserTable = ({ users }) => (
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
            <Link to={`/users/${props.value}/show`}>Show</Link>
            {" | "}
            <Link to={`/users/${props.value}/edit`}>Edit</Link>
          </span>
        )
      }
    ]}
  />
);

export default UserTable;
