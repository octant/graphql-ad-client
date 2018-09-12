import React from "react";
import { Route } from "react-router-dom";

// import EditQuestion from "./Edit";
import ListQuestions from "./List";
// import NewQuestion from "./New";
// import ShowQuestion from "./Show";

const Questions = props => {
  return (
    <div>
      <h3>Questions</h3>

      <Route
        path="/questions"
        exact
        render={props => <ListQuestions {...props} />}
      />

      {/* <Route path="/users/new" exact render={props => <NewQuestion {...props} />} /> */}

      {/* <Route
        path="/users/:username/show"
        exact
        render={props => <ShowQuestion {...props} />}
      /> */}

      {/* <Route
        path="/users/:username/edit"
        exact
        render={props => <EditQuestion {...props} />}
      /> */}
    </div>
  );
};

export default Questions;
