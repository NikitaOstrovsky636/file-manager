import { resolve, join } from 'path';
import { cwd } from 'process';
import { stat, rename } from 'node:fs/promises';

export default async function(pathToFile, newFileName) {
    try {

        if (pathToFile === null) {
            throw new Error(`\nInvalid input. You are currently in ${cwd()}\n`);
        } else {

            const currentDirectory = cwd();
            const resolvedPathToOldFile = resolve(currentDirectory, pathToFile);
            const resolvedPathToNewFile = join(currentDirectory, newFileName);

            const isOldFileExists = await stat(resolvedPathToOldFile)
                .then((data) => (data.isFile()) ? true : false)
                .catch(() => false);

            const isNewFileExists = await stat(resolvedPathToNewFile)
                .then((data) => (data.isFile()) ? true : false)
                .catch(() => false);

            if (isOldFileExists && !isNewFileExists) {
                await rename(resolvedPathToOldFile, newFileName);
                console.log(`\nYou are currently in ${currentDirectory}\n`);
            } else {
                throw new Error(`Operation failed! You are currently in ${currentDirectory}\n`);
            }
        }
    } catch (e) {
        console.log(e.message);
    }
} 