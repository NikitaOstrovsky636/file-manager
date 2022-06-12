import { cwd } from 'process';

import getEolInfo from './get-end-of-line-info.js';
import getCpusInfo from './get-cpus-info.js';
import getHomedirInfo from './get-homedir-info.js';
import getUsernameInfo from './get-username-info.js';
import getArchitectureInfo from './get-architecture-info.js';

export default function(flag) {
    try {
        if (flag === null || !flag.startsWith('--')) {
            throw new Error(`Operation failed! You are currently in ${currentDirectory}\n`);
        } else {
            switch (flag) {
                case ('--EOL'):
                    getEolInfo();

                    break;
                
                case ('--cpus'):
                    getCpusInfo();

                    break;
                
                case ('--homedir'):
                    getHomedirInfo();
    
                    break;

                case ('--username'):
                    getUsernameInfo();
        
                    break;

                case ('--architecture'):
                    getArchitectureInfo();

                    break;
                
                default:
                    throw new Error(`Operation failed! You are currently in ${cwd()}\n`);
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}