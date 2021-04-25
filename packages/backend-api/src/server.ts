import './environment';
import App from './app';
import { AuthRoute, UsersRoute, ExercisesRoute, WorkoutsRoute } from './routes';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([
  new AuthRoute(),
  new UsersRoute(),
  new ExercisesRoute(),
  new WorkoutsRoute(),
]);

app.listen();
