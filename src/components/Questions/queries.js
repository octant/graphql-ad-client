import gql from "graphql-tag";

export const QUESTIONS = gql`
  query getQuestions {
    questions {
      id
      type
      stem
      stem
      alternatives {
        id
        inputType
        value
        text
        type
        respondents
      }
    }
  }
`;
