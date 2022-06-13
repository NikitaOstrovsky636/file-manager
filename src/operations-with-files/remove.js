import { resolve } from 'path';
import { cwd } from 'process';
import { stat, rm } from 'node:fs/promises';

export default async function(pathToFile) {
    try {

        if (pathToFile === null) {
            throw new Error(`\nInvalid input. You are currently in ${cwd()}\n`);
        } else {
            const currentDirectory = cwd();
            const resolvedPathToFile = resolve(currentDirectory, pathToFile);

            const isSourceFileExists = await stat(resolvedPathToFile)
                .then((data) => (data.isFile()) ? true : false)
                .catch(() => false);

            if (isSourceFileExists) {
                await rm(resolvedPathToFile);

                console.log(`\nYou are currently in ${currentDirectory}\n`);
            } else {
                throw new Error(`Operation failed! You are currently in ${currentDirectory}\n`);
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}