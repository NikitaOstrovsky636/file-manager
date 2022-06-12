import { resolve, join, basename } from 'path';
import { cwd } from 'process';
import { stat, copyFile } from 'node:fs/promises';

export default async function(sourceFile, targetDirectory) {
    try {

        if (sourceFile === null || targetDirectory === null) {
            throw new Error(`\nInvalid input. You are currently in ${cwd()}\n`);
        } else {
            const currentDirectory = cwd();
            const resolvedPathToSourceFile = resolve(currentDirectory, sourceFile);
            const resolvedPathToTargetFolder = resolve(currentDirectory, targetDirectory);

            const isSourceFileExists = await stat(resolvedPathToSourceFile)
                .then((data) => (data.isFile()) ? true : false)
                .catch(() => false);

            const isTargetFolderExists = await stat(resolvedPathToTargetFolder)
                .then((data) => (data.isDirectory()) ? true : false)
                .catch(() => false);
            
            const isTargetFileExists = await stat(join(resolvedPathToTargetFolder, basename(resolvedPathToSourceFile)))
                .then(() => true)
                .catch(() => false);

            if (isSourceFileExists && isTargetFolderExists && !isTargetFileExists) {
                copyFile(resolvedPathToSourceFile, join(resolvedPathToTargetFolder, basename(resolvedPathToSourceFile)));

                console.log(`\nYou are currently in ${currentDirectory}\n`);
            } else {
                throw new Error(`Operation failed! You are currently in ${currentDirectory}\n`);
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}