import * as path from 'path';
export const staticDir = path.resolve(path.join(__dirname, '..', 'public')),
    downloadsDir = path.join(staticDir, 'downloads'),
    jobOutputDir = path.join(downloadsDir, 'jobs'),
    configDir = path.resolve(path.join(__dirname, '..', 'config'))