module.exports = {
  apps: [
    {
      name: "Chunlin's NodeJs docker boilerplate",
      script: './bin/www',
      env_production: {
        NODE_ENV: 'production',
        APPLICATION_PORT: '8080',
      },
    },
  ],
};
