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

export const EDIT_QUESTION = gql`
  query getQuestion($id: String!) {
    question(id: $id) {
      id
      type
      stem
      topic
      alternatives {
        id
        value
        text
        type
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation updateQuestion($id: String!, $question: QuestionInput!) {
    updateQuestion(id: $id, question: $question) {
      id
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
