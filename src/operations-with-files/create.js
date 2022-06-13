import { join } from 'path';
import { cwd } from 'process';
import { writeFile } from 'node:fs/promises';

export default async function(fileName) {
    try {

        if (fileName === null) {
            throw new Error(`\nInvalid input. You are currently in ${cwd()}\n`);
        } else {
            const currentDirectory = cwd();
            const pathToFile = join(currentDirectory, fileName);

            await writeFile(pathToFile, '', 'utf-8');
            console.log(`\nYou are currently in ${currentDirectory}\n`);
        }
    } catch (e) {
        console.log(e.message);
    }
} 