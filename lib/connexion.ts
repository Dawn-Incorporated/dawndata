import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    port: parseInt(process.env.DB_PORT || '', 10)
});

async function execute(query: string) {
    try {
        const [response, fields] = await connection.query(query);
        return response;
    } catch (err) {
        return err;
    }
}

export default execute;
