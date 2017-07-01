/**
 * Carrega as configurações
 */
require('dotenv').config();

const app = require('./server');
const config = require('./config');
const db = require('./db');

(async () => {

  try {

    await db.connect(
      config.db.host,
      config.db.port,
      config.db.user,
      config.db.password,
      config.db.name,
    );

    console.log(`Database connected at ${config.db.host}:${config.db.port}`);

  } catch(err) {

    console.log('Database connection error.', err);
    process.exit();
  }

  app.listen(config.server.port, () => {
    console.log(`Server running at http://${config.server.host}:${config.server.port}`)
  })
})();
