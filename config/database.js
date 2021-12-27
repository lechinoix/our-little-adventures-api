module.exports = () => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: '0.0.0.0',
        port: 54320,
        database: 'postgres',
        username: 'postgres',
        password: 'my_password',
      },
      options: {
        autoMigration: true,
      },
    },
  },
});
