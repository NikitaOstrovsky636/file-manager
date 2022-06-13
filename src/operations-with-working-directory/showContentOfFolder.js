import { readdir } from "node:fs/promises";

export default async function showContentOfFolder(path) {
    try {
        const content = await readdir(path);
        console.log(content);
        console.log(`You are currently in ${path}\n`);
    } catch(e) {
        console.log('Operation failed\n');
    }
}

