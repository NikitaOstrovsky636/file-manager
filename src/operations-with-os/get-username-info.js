import { userInfo } from 'os';
import { cwd } from 'process';

export default function() {
    console.log(`\nYour username is ${userInfo().username}`);
    console.log(`You are currently in ${cwd()}\n`);
}