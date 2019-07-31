
export const SELECT_FACES_BY_NAME = 'SELECT personId,embedding,name FROM face WHERE name = $1 LIMIT $2',
    INSERT_FACE_DATA = 'INSERT INTO face VALUES($1, $2, $3, $4)'
