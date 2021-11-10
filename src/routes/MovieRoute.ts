import * as express from 'express';
import { MovieController } from '../controllers/MovieController';

const Router = express.Router();
const movieController = new MovieController();
Router.get('/major/movietoday' , movieController.getMovieThaiware);


export default Router;