import { homedir } from 'os';
import { chdir } from 'process';

import showContentOfFolder from './operations-with-working-directory/showContentOfFolder.js';
import goToFolder from './operations-with-working-directory/goToFolder.js';
import goToUpperFolder from './operations-with-working-directory/goToUpperFolder.js';
import readFile from './operations-with-files/read.js';
import createFile from './operations-with-files/create.js';
import renameFile from './operations-with-files/rename.js';
import copyFile from './operations-with-files/copy.js';
import moveFile from './operations-with-files/move.js';
import removeFile from './operations-with-files/remove.js';

let currentFolderPath = homedir();

if (currentFolderPath === homedir()) {
    chdir(currentFolderPath);
}

export default async function handleCommands(command) {
    try {

        const arrayFromCommand = command.split(' ');
        const commandName = arrayFromCommand[0];

        switch (commandName) {
            case ('ls'):
                showContentOfFolder(currentFolderPath);
                break;

            case ('cd'):
                const pathFromHandler = await goToFolder(currentFolderPath, arrayFromCommand[1] || null);

                if (pathFromHandler !== currentFolderPath) currentFolderPath = pathFromHandler;

                break;
            
            case ('up'):
                const pathOfUpperFolder = await goToUpperFolder(currentFolderPath);
                
                if (pathOfUpperFolder !== currentFolderPath) currentFolderPath = pathOfUpperFolder;

                break;

            case ('cat'):
                const pathToFile = arrayFromCommand[1];

                readFile(pathToFile || null); 

                break;

            case ('add'):
                const fileName = arrayFromCommand[1];

                createFile(fileName || null);

                break;

            case ('rn'):
                const pathToRenamedFile = arrayFromCommand[1];
                const newFileName = arrayFromCommand[2];
                
                renameFile(pathToRenamedFile || null, newFileName || null);

                break;

            case ('cp'):
                const pathToCopiedFile = arrayFromCommand[1];
                const pathToCopiedDirectory = arrayFromCommand[2];

                copyFile(pathToCopiedFile || null, pathToCopiedDirectory || null);

                break;

            case ('mv'):
                const pathToMovedFile = arrayFromCommand[1];
                const pathToMovingDirectory = arrayFromCommand[2];
    
                moveFile(pathToMovedFile || null, pathToMovingDirectory || null);
    
                break;

            case ('rm'):
                const pathToRemovedFile = arrayFromCommand[1];

                removeFile(pathToRemovedFile || null);

                break;
        }

    } catch(e) {
        console.log(e.message);
    }
}