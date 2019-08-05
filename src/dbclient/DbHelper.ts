import { DbConnection } from './DbConnection';
import * as qri from './Queries';
import uuidv4 from 'uuidv4';

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
    async insertFace(embedding: number[], name: string, datasetName: string = 'custom', datasetVarient: string = 'manual') {
        let faceId = uuidv4();
        let personId = await this.getPersonId(name).catch(err => console.log(err));
        try {
            let res1 = await this.db.executeQuery(qri.INSERT_FACE_DATA, [faceId, embedding, personId, name]);
            res1['face_id'] = faceId;
            return res1;
        } catch (err) {
            return Promise.reject(err.message);
        }
    }
    async getFaceByName(name: string, count: number) {
        try {
            return await this.db.executeQuery(qri.SELECT_FACES_BY_NAME, [name, count]);
        } catch (err) {
            return Promise.reject(err.message);
        }
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

    async updateDatasetInfo(datasetName: string, datasetVarient: string, fileName: string, faceId: string) {
        try {
            return await this.db.executeQuery(qri.INSERT_INTO_DATASET_FACE_ID, [datasetName, datasetVarient, fileName, faceId])
        } catch (err) {
            return Promise.reject(err.message);
        }
    }

    async getFaceAndLabels() {
        try {
            return await this.db.executeQuery(qri.SELECT_FACE_PERSON_NAME_FOR_CLASSIFIER, []);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
