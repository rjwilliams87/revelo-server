import 'dotenv/config';
import { ApolloError } from 'apollo-server-express';

import main from './app';

(async function boot() {
  try {
    await (async function boot_servers() {
      const { app } = await main({ path: '/graphql' });

      try {
        await (async function boot_graphql() {
          await app.listen(process.env.PORT);
          console.log('listening on port', process.env.PORT);
        })();
      } catch (err) {
        console.log(err);
        throw new ApolloError(
          'there was a problem booting this graphql endpoint. this might indicate that the server is not able to listen on this port.',
        );
      }
    })();
  } catch (ex) {
    if (ex instanceof ApolloError) {
      console.log(ex);
      return;
    }
    const { message, stack } = ex;
    console.log({ message, stack });
    process.exit(1);
  }
})();
