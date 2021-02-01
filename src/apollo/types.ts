export interface AppContext {
  requestId: string;
  req: Request;
  dataSources?: Record<string, any>;
}
