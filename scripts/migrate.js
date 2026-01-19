import { readFileSync } from 'fs';
import { resolve } from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

const runMigration = async () => {
    try {
        const migrationPath = resolve('server/db/migrations/12_add_application_fields.sql');
        const sql = readFileSync(migrationPath, 'utf8');

        console.log('Running migration...');
        await pool.query(sql);
        console.log('Migration completed successfully.');
    } catch (error) {
        console.error('Error running migration:', error);
    } finally {
        await pool.end();
    }
};

runMigration();
