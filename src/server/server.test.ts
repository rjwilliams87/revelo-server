import 'jest-extended';

import { app } from './server';

describe('app', () => {
  test('it is a function', () => {
    expect(app).toBeFunction();
    expect(app.listen).toBeFunction();
  });
});
