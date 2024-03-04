import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASS || '',
    port: parseInt(process.env.DB_PORT || '', 10),
    database: process.env.DB_NAME || ''
});

async function query(query: string) {
    try {
        const [results, fields] = await connection.query(query);
        return results;
    } catch (err) {
        console.error('Error executing query:', err);
        throw err;
    }
}

export default query;
