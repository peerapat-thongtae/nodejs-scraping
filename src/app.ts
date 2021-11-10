import express, { json } from 'express';
import axios from 'axios';
import { load } from 'cheerio';
import JobRoute from './routes/JobRoute';
import MovieRoute from './routes/MovieRoute';

const app = express();
const PORT = process.env.PORT || 4500;

app.use(json());

app.use('/job' , JobRoute);
app.use('/movie' , MovieRoute);

app.listen(PORT , () => console.log(`PORT ${PORT}`));