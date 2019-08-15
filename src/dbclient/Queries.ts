
export const SELECT_FACES_BY_NAME = 'SELECT personId,embedding,personName FROM face WHERE personName = $1 LIMIT $2 AS RESULT ',
    INSERT_FACE_DATA = 'INSERT INTO face VALUES($1, $2, $3, $4)',
    INSERT_INTO_DATASET_FACE_ID = 'INSERT INTO dataset(ds_name, ds_variant, filename, face_id) VALUES($1, $2, $3, $4) AS RESULT',
    SELECT_FACE_PERSON_NAME_FOR_CLASSIFIER = 'SELECT embedding,personname FROM face,dataset WHERE id = face_id AND ds_name = $1 AND ds_variant = $2 AS RESULT',
    REGISTER_JOB = 'SELECT public.register_job($1) AS RESULT',
    UPDATE_JOB_STATUS = 'SELECT public.update_job_status($1, $2, $3) AS RESULT',
    GET_JOB_STATUS = 'SELECT public.get_job_status($1) AS RESULT',
    GET_JOB_RESULT = 'SELECT public.get_job_result($1) AS RESULT',
    UPDATE_JOB_RESULT = 'SELECT publi.update_job_result($1, $2, $3) AS RESULT';
