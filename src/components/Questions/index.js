import React from "react";
import { Route } from "react-router-dom";

import EditQuestion from "./Edit";
import ListQuestions from "./List";
import NewQuestion from "./New";
import ShowQuestion from "./Show";

const Questions = props => {
  return (
    <div>
      <h3>Questions</h3>

      <Route
        path="/questions"
        exact
        render={props => <ListQuestions {...props} />}
      />

      <Route
        path="/questions/new"
        exact
        render={props => <NewQuestion {...props} />}
      />

      <Route
        path="/questions/:id/show"
        exact
        render={props => <ShowQuestion {...props} />}
      />

      <Route
        path="/questions/:id/edit"
        exact
        render={props => <EditQuestion {...props} />}
      />
    </div>
  );
};

export default Questions;
