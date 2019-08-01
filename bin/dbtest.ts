import { DbHelper } from '../src/dbclient/DbHelper';
let run = async () => {
    let dbh = new DbHelper();
    await dbh.insertFace([22 / 7, 2 / 3, 3 / 3, 4 / 3, 5 / 3], 'person1');
    console.log(await dbh.getFaceByName('person1', 2));
}
run();