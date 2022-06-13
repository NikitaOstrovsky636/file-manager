import { resolve } from 'path';
import { chdir } from 'process';
import { stat } from 'node:fs/promises';
import { cwd } from 'process';

export default async function(current, target) {
    try {
        if (target === null) {
            throw new Error(`\nInvalid input. You are currently in ${cwd()}\n`);
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