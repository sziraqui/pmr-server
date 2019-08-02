
export const SELECT_FACES_BY_NAME = 'SELECT personId,embedding,personName FROM face WHERE personName = $1 LIMIT $2',
    INSERT_FACE_DATA = 'INSERT INTO face VALUES($1, $2, $3, $4)',
    INSERT_INTO_DATASET_FACE_ID = 'INSERT INTO dataset(ds_name, ds_variant, filename, face_id) VALUES($1, $2, $3, $4)'
