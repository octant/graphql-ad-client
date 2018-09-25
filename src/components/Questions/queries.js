import gql from "graphql-tag";

export const QUESTIONS = gql`
  query getQuestions {
    questions {
      id
      type
      topic
      stem
    }
  }
`;

export const QUESTION = gql`
  query getQuestion($id: String!) {
    question(id: $id) {
      id
      type
      stem
      alternatives {
        id
        value
        text
        type
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation addQuestion($question: QuestionInput!) {
    addQuestion(question: $question) {
      id
    }
  }
`;
