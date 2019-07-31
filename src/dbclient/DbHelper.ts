import { DbConnection } from './DbConnection';
import * as qri from './Queries';
import uuidv4 = require('uuidv4');

export class DbHelper {
    private db: DbConnection;

    constructor() {
        this.db = DbConnection.getInstance();
    }
    /**
     * 
     * @param embedding 128 length face embedding
     * @param name Name for this person
     */
    async insertFace(embedding: number[], name: string) {
        let faceId = uuidv4();
        let personId = await this.getPersonId(name).catch(err => console.log(err));;
        await this.db.executeQuery(qri.INSERT_FACE_DATA, [faceId, embedding, personId, name]).catch(err => console.log(err));
    }
    async getFaceByName(name: string, count: number) {
        return await this.db.executeQuery(qri.SELECT_FACES_BY_NAME, [name, count]).catch(err => console.log(err));
    }
    /**
     * Retrives personId if name exists in face database
     * New uuid is created if name cannot be found
     * @param name name of person in database
     */
    async getPersonId(name: string) {
        let result = await this.getFaceByName(name.toLocaleLowerCase(), 1).catch(err => console.log(err));
        if (result && result.length > 0 && uuidv4.is(result[0].personid)) {
            return result[0].personid;
        } else return uuidv4();
    }
}