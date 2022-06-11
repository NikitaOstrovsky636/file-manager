import { homedir } from 'os';

import showContentOfFolder from './pathToFolders/showContentOfFolder.js';
import goToFolder from './pathToFolders/goToFolder.js';
import goToUpperFolder from './pathToFolders/goToUpperFolder.js'

let currentFolderPath = homedir();

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
        }

    } catch(e) {
        console.log(e.message);
    }
}