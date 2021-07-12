import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import WebSocket from 'ws';

export class JMXController {
  static fetchData: RequestHandler = async (req, res, next) => {
    console.log('jmx');

    return next();
  };
}
