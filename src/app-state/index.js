export const typedefs = `
  type AppState {
    selectedUser: String
  }

  type Query {
    appState: AppState
  }
`;

export const defaults = {
  appState: {
    __typename: "AppState",
    selectedUser: ""
  }
};

export const resolvers = {
  Mutation: {
    selectUser: (_, { username }, { cache }) => {
      cache.writeData({
        data: {
          appState: { __typename: "AppState", selectedUser: username }
        }
      });
      return null;
    }
  }
};
