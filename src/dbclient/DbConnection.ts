import * as secrets from '../../config/secrets.json';
import * as settings from '../../config/dbconfig.json';

import { Pool } from 'pg';

export class DbConnection {
    private static instance;
    private constructor(private pool: Pool) { }

    public static getInstance() {
        const ENV = secrets.environment || 'local';
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
    executeQuery(query: string, params: any[] = []) {
        return this.pool.connect()
            .then(dbClient => {
                return dbClient.query(query, params)
                    .then(data => {
                        dbClient.release();
                        return data.rows;
                    })
                    .catch(err => {
                        dbClient.release();
                        console.log(err);
                        return Promise.reject(err);
                    });
            })
            .catch(err => {
                console.log(err);
                return Promise.reject(err);
            });
    }
}