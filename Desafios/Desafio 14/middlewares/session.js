import session from 'express-session';
import { mongoStore } from './../config.js';
export const sessionHandler = session(mongoStore);