import { resolve } from 'path';
import { chdir } from 'process';
import { stat } from 'node:fs/promises';

export default async function(currentPath) {    
    try {

        const newPath = resolve(currentPath, '..');
        console.log(newPath);
        const isFolderExists = await stat(newPath).then((data) => (data.isDirectory()) ? true : false).catch(() => false);

        chdir(newPath);
        console.log(`You are currently in ${newPath}\n`);
        return newPath;

    } catch (e) {
        console.log(e.message);
        return current;
    }
}