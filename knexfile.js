// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: 'library',
      user: 'postgres',
      password: 'postgres',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true,
  },
};
