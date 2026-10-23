import 'dotenv/config';
import app from './app';

const configuredPort = Number(process.env.PORT ?? '3000');
if (!Number.isInteger(configuredPort) || configuredPort < 0 || configuredPort > 65535) {
  throw new Error('PORT must be an integer between 0 and 65535');
}

app.listen(configuredPort, () => {
  console.log(`Veterinary appointments API listening on port ${configuredPort}`);
});
