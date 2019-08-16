import * as path from 'path';
export const rootDir = path.resolve(path.join(__dirname, '..')),
    staticDir = path.resolve(path.join(rootDir, 'public')),
    downloadsDir = path.join(staticDir, 'downloads'),
    jobOutputDir = path.join(downloadsDir, 'jobs'),
    configDir = path.resolve(path.join(rootDir, 'config')),
    configFile = path.join(configDir, 'default.json'),
    videoDir = path.join(rootDir, 'data', 'videos')