import React from "react";
import ReactTable from "react-table";
import matchSorter from "match-sorter";
import { Link } from "react-router-dom";

const QuestionTable = ({ questions }) => (
  <ReactTable
    data={questions}
    filterable
    columns={[
      {
        accessor: "stem",
        Header: "Stem",
        filterAll: true,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["stem"] })
      },
      {
        accessor: "topic",
        Header: "Topic",
        filterAll: true,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["topic"] })
      },
      {
        accessor: "type",
        Header: "Type",
        filterAll: true,
        filterMethod: (filter, rows) =>
          matchSorter(rows, filter.value, { keys: ["type"] })
      },
      {
        Header: "Actions",
        accessor: "id",
        filterable: false,
        Cell: props => (
          <span>
            <Link to={`/questions/${props.value}/show`}>Show</Link>
            {" | "}
            <Link to={`/questions/${props.value}/edit`}>Edit</Link>
          </span>
        )
      }
    ]}
  />
);

export default QuestionTable;
