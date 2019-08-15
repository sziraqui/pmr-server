import * as secrets from '../../config/secrets.json';
import * as settings from '../../config/dbconfig.json';
import * as config from '../../config/default.json';

import { Pool } from 'pg';

export class DbConnection {
    private static instance: DbConnection;
    private constructor(private pool: Pool) { }

    public static getInstance() {
        const ENV = config.environment || 'dev';
        if (!DbConnection.instance) {
            console.log('Creating database pool');
            let pool = new Pool({
                user: secrets[ENV].db.user,
                password: secrets[ENV].db.password,
                host: settings[ENV].host,
                port: settings[ENV].port,
                database: settings[ENV].dbname
            });
            DbConnection.instance = new DbConnection(pool);
        }
        return DbConnection.instance;
    }

    getPool() {
        return this.pool;
    }

    /**
     * Execute any query
     * @param query 
     * @param params 
     */
    async executeQuery(query: string, params: any[] = []) {
        try {
            const dbClient = await this.pool.connect();
            try {
                const data = await dbClient.query(query, params);
                dbClient.release();
                return data.rows[0]['result'];
            }
            catch (err) {
                dbClient.release();
                console.log(err);
                return Promise.reject(err);
            }
        }
        catch (err_1) {
            console.log(err_1);
            return Promise.reject(err_1);
        }
    }
}
