import { app } from './server';

const PORT = process.env.PORT || '4000';

app.listen({ port: PORT }, () => {
  console.log('Listening on port 4000');
});
