import { createReadStream } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';
import { stat } from 'node:fs/promises';

export default async function(pathToFile) {
    try {

        if (pathToFile === null) {
            throw new Error(`\nInvalid input. You are currently in ${cwd()}\n`);
        } else {

            const currentDirectory = cwd();
            const resolvedPathToFile = resolve(currentDirectory, pathToFile);
            const isFileExists = await stat(resolvedPathToFile)
                .then((data) => (data.isFile()) ? true : false)
                .catch(() => false);

            if (isFileExists) {

                const readStream = createReadStream(resolvedPathToFile, 'utf-8');
                let data = '';

                for await (let chunk of readStream) {
                    data += chunk;
                }

                console.log(data);
                console.log(`\nYou are currently in ${currentDirectory}\n`);

            } else {
                throw new Error(`Operation failed! No such file.\n`);
            }
        }
    } catch (e) {
        console.log(e.message);
    }
} 