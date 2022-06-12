import { resolve } from 'path';
import { chdir } from 'process';
import { stat } from 'node:fs/promises';

export default async function(current, target) {
    try {
        if (target === null) {
            throw new Error(`Operation failed! You are currently in ${current}\n`);
        } else {

            const newPath = resolve(current, target);
            const isFolderExists = await stat(newPath)
                .then((data) => (data.isDirectory()) ? true : false)
                .catch(() => false);
    
            if (isFolderExists) {
                chdir(newPath);
                console.log(`You are currently in ${newPath}\n`);
                return newPath;
            } else {
                throw new Error(`Operation failed! You are currently in ${current}\n`);
            }

        }
    } catch (e) {
        console.log(e.message);
        return current;
    }
}