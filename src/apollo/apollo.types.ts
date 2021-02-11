export type AppContext = {
  requestId: string;
  req: Request;
  dataSources?: Record<string, any>;
};
