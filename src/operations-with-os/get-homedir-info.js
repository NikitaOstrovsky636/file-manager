import { homedir } from 'os';
import { cwd } from 'process';

export default function() {
    console.log(`\nHomedir directory is ${homedir}\nYou are currently in ${cwd()}\n`);
}