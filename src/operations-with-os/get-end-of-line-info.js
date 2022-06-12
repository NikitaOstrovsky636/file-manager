import { EOL } from 'os';
import { cwd } from 'process';

export default function() {
    console.log(`\n${JSON.stringify(EOL)}\nYou are currently in ${cwd()}\n`);
}