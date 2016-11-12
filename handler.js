import awsServerlessExpress from 'aws-serverless-express';
import app from './api';

const server = awsServerlessExpress.createServer(app);

export function appHandler(event, context) {
  return awsServerlessExpress.proxy(server, event, context);
}
