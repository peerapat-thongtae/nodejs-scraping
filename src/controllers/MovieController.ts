import cheerio from "cheerio";
import { NextFunction, Request, Response } from "express";
import { JobInterface } from "../models/JobModel";
import { scrapingJobBlognone, scrapingJobsDB, scrapingJobThai } from "../services/JobService";
import { scrapingMajorMovie } from "../services/MovieService";

export class MovieController {

  // private userRepository = getRepository(User);

  async getMovieThaiware(req: Request, res: Response, next: NextFunction) {
    try {
      const html = await scrapingMajorMovie();
      const $ = cheerio.load(html);
      const movieHtml:Array<any> = Array.from($('div#showTime-movie').find('a'));
      const movies:Array<any> = movieHtml.map((ele) => ({
        name: $(ele).data('name'),
        date: $(ele).find('.m_release').text().replace('\n\t\t\t\t\t\t\t\t\t\tเข้าฉาย',''),
      }));
      console.log(movieHtml.length);
      return res.send(movies);
    } catch(e) {
      return res.send(e.message);
      // bqm-list-movie
    }
  }

}