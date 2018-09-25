import React from "react";

const ShowQuestion = ({ question }) => {
  return (
    <div>
      <p>{question.stem}</p>
      <form>
        {question.alternatives.map(a => (
          <p key={a.value}>
            {a.text} {a.type === "answer" ? "*" : ""}
          </p>
        ))}
      </form>
    </div>
  );
};

export default ShowQuestion;
