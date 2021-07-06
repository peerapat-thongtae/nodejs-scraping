import express, { json } from 'express';
import axios from 'axios';
import { load } from 'cheerio';
import JobRoute from './routes/JobRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());

app.use('/job' , JobRoute);

app.listen(PORT , () => console.log(`PORT ${PORT}`));