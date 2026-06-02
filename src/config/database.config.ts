export default () => ({
    postgres: {
        host: process.env.DB_HOST || 'localhost',
        port: (process.env.DB_PORT || 5432) as number,
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
    },
});
