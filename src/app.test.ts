import 'jest-extended';

import $cors from '../__mocks__/cors';
import { $express } from '../__mocks__/express';
import main from './app';

jest.mock('./apollo/server', () => {
  const createApolloServer = () => ({
    applyMiddleware: jest.fn(),
  });
  return { createApolloServer };
});

describe('main', () => {
  test('it is a function', () => {
    expect(main).toBeFunction();
  });

  describe('when called', () => {
    test('it returns an object', async () => {
      const $app = await main();
      expect($app).toBeObject();
      expect($app).toMatchObject({
        app: expect.any(Object),
      });
    });

    test('app.use is called', async () => {
      await main();
      expect($express.use).toHaveBeenCalled();
    });

    test('cors is called', async () => {
      await main();
      expect($cors).toHaveBeenCalled();
    });
  });
});
