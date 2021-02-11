export const $apollo = {
  applyMiddleware: jest.fn(),
};

export class ApolloServer {
  applyMiddleware(...args) {
    $apollo.applyMiddleware(...args);
  }
}
