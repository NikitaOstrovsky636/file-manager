import {  stdin as input, stdout as output  } from 'process';
import { homedir } from 'os';
import handleCommands from './handleCommands.js';
import readLine from 'readline';

const userName = process.argv[2].split('=')[1]; 
const rl = readLine.createInterface({ input, output });

console.log(`Welcome to the File Manager, ${userName}!\nYou are currently in ${homedir}\n`);

rl.on('line', input => {
    if (input.toString().trim() === '.exit') {
        process.exit();
    } else {
        handleCommands(input);
    }
});

process.on('exit', () => console.log(`Thank you for using File Manager, ${userName}!\n`));
process.on('SIGINT', process.exit);