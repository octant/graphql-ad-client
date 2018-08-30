export const typedefs = `
  type Query {
    selectedUser: String
  }
`;

export const defaults = {
  selectedUser: ""
};

export const resolvers = {
  Mutation: {
    selectUser: (_, { username }, { cache }) => {
      cache.writeData({ data: { selectedUser: username } });
      return null;
    }
  }
};
