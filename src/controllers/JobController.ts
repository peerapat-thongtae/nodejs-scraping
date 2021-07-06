import cheerio from "cheerio";
import { NextFunction, Request, Response } from "express";
import { JobInterface } from "../models/JobModel";
import { scrapingJobBlognone, scrapingJobsDB, scrapingJobThai } from "../services/JobService";

export class JobController {

  // private userRepository = getRepository(User);

  async getJobThai(req: Request, res: Response, next: NextFunction) {
    try {
      const html = await scrapingJobThai(1);
      const $ = cheerio.load(html);
      const jobHtml:Array<any> = Array.from($('.msklqa-8'));
      const jobs:Array<JobInterface> = jobHtml.map((ele) => ({
          link : 'www.jobthai.com'+$(ele).find('a').attr('href'),
          jobName : $(ele).find('.frNqfE').text(),
          companyName : $(ele).find('.gWWIiL').first().text(),
          location : $(ele).find('#location-text').text(),
          salary : $(ele).find('#salary-text').text(),
          announceDate : $(ele).find('.itKEax').last().text()
      }));
      console.log(jobHtml.length);
      return res.send(jobs);
    } catch(e) {
      return res.send(e.message);
    }
  }

  async getJobsDB(req : Request , res : Response , next : NextFunction) {
    try {
      const html = await scrapingJobsDB(1);
      const $ = cheerio.load(html);
      const jobHtml = Array.from($(`div[data-automation="jobListing"]`).find('article'));
      const jobs:Array<JobInterface> = jobHtml.map((ele) => ({
        link : 'th.jobsdb.com'+$(ele).find('.DvvsL_0').attr('href'),
        jobName : $(ele).find('.DvvsL_0').find('div').text(),
        companyName : $(ele).find(`div[data-automation="job-card-logo"] > img`).attr('alt'),
        location : $(ele).find('div[data-automation="job-card-selling-points"]').prev().text(),
        salary : '',
        announceDate : $(ele).find('div[data-automation="job-card-selling-points"]').parent().next().find('time').attr('datetime'),
      }));
      console.log(jobs);
      return res.send(jobs);
    } catch (e) {
      return res.send(e.message);
    }
  }

  async getJobBlognone(req : Request , res : Response , next :NextFunction) {
    try {
      const html = await scrapingJobBlognone(1);
      const $ = cheerio.load(html);
      const jobHtml = Array.from($('.card'));
      const jobs:Array<JobInterface> = jobHtml.map((ele) => ({
            link : $(ele).attr('href'),
            jobName : $(ele).find('div[class="position-relative d-flex"] > div.col > h3 > span').first().text(),
            companyName : $(ele).find('div[class="position-relative d-flex"] > div.col > h3').next().next().next().text(),
            location : $(ele).find('div[class="position-relative d-flex"] > div.col > h3').next().next().next().next().text(),
            salary : $(ele).find('div[class="position-relative d-flex"] > div.col > h3').next().next().text(),
            level : $(ele).find('div[class="position-relative d-flex"] > div.col > h3').next().text(),
            announceDate : $(ele).find('div[class="position-relative d-flex"] > div.col > span').first().text()
      }));
      console.log(jobHtml.length);
      return res.send(jobs);
    } catch (e) {
      return res.send(e.message);
    }
  }

}