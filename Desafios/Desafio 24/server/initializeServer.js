import { fork, port } from './../args/args.js'
import clusterServer from './clusterServer.js';
import forkServer from './forkServer.js';

export default function initializeServer(app){
    if(fork){
        forkServer(app, port);
    }else{
        clusterServer(app, port);
    }
}