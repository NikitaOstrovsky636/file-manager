import os from 'os';
import { cwd } from 'process';

export default function() {
    const correctInfo = [];

    os.cpus().forEach((cpu, index) => {
        correctInfo[index] = {};
        correctInfo[index].model = cpu.model;
        correctInfo[index].speed = cpu.speed / 1000;
    })

    console.log(correctInfo);
    console.log(`\nYou are currently in ${cwd()}\n`);
}