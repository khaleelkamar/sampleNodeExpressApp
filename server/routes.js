import crudRouter from './api/controllers/router';

export default function routes(app) {
  app.use('/api/v1', crudRouter);
}
