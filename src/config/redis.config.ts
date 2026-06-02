export default () => ({
    host: process.env.HOST || 'localhost',
    port: (process.env.PORT || 6379) as number,
    password: process.env.PASSWORD || '',
    username: process.env.USERNAME || '',
});
