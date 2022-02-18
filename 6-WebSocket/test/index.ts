import { config } from 'dotenv';
config();
import { Context } from 'aws-lambda';
// import { handler } from '../src/socket-lambda';
import { handler } from '../src/socket-send-new-like-lambda';
import { event } from './event';

const context = {
  done: (none: any, resText: any) => {
    console.log('lambda done', resText);
  },
};

handler(event as any, context as Context, null as any);
