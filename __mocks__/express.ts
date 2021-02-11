const $express = {
  listen: jest.fn(),
  use: jest.fn(),
};

type Application = Record<string, unknown>;

const express = (): Application => {
  const app = {
    listen: $express.listen,
    use: $express.use,
  };
  return app;
};

export { Application, $express };
export default express;
