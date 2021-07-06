import * as express from 'express';
import { JobController } from '../controllers/JobController';

const Router = express.Router();
const jobs = new JobController();
Router.get('/jobthai' , jobs.getJobThai);
Router.get('/jobsdb' , jobs.getJobsDB);
Router.get('/jobblognone' , jobs.getJobBlognone);

export default Router;