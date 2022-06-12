import { resolve } from 'path';
import crypto from 'crypto';
import { createReadStream } from 'fs';
import { cwd } from 'process';
import { stat } from 'node:fs/promises';

export default async function(pathToFile) {
    try {

        if (pathToFile === null) {
            throw new Error(`\nInvalid input. You are currently in ${cwd()}\n`);
        } else {
            const currentDirectory = cwd();
            const resolvedPathToFile = resolve(cwd(), pathToFile);

            const isFileExists = await stat(resolvedPathToFile)
                .then((data) => (data.isFile()) ? true : false)
                .catch(() => false);

            if (isFileExists) {
                const hash = crypto.createHash('sha256');
                
                const fileData = createReadStream(resolvedPathToFile, 'utf-8');

                for await(const chunk of fileData) {
                    hash.update(chunk);
                }
            
                console.log(hash.digest('hex'));

                console.log(`You are currently in ${currentDirectory}\n`);
            } else {
                throw new Error(`Operation failed! You are currently in ${currentDirectory}\n`);
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}