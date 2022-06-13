import os from 'os';
import { cwd } from 'process';

export default function() {
    console.log(`\nCPU architecture info: ${os.arch()}`);
    console.log(`You are currently in ${cwd()}\n`);
}