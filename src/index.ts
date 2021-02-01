import { ApolloError } from 'apollo-server-express';

import main from './app';

const BootGraphQLException = 'BootGraphQLException';

(async function boot() {
  try {
    await (async function boot_servers() {
      const { app } = await main({ path: '/graphql' });
      const GRAPHQL_URL = `http://0.0.0.0:${process.env.PORT}${process.env.API_PATH}`;

      try {
        await (async function boot_graphql() {
          await app.listen(process.env.API_PORT);
        })();
      } catch (err) {
        throw new ApolloError(
          'there was a problem booting this graphql endpoint. this might indicate that the server is not able to listen on this port.',
          String(BootGraphQLException),
          {
            err,
            GRAPHQL_URL,
          },
        );
      }
    })();
  } catch (ex) {
    if (ex instanceof ApolloError) {
      // logger.info(ex);
      return;
    }
    const { message, stack } = ex;
    // logger.info({
    //   level: 'fatal',
    //   message: 'i have encountered an unexpected error. shame on my developer.',
    //   meta: {
    //     err: {
    //       message,
    //       stack,
    //     },
    //   },
    // });

    process.exit(1);
  }
})();
