const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/' , async(req , res) => {
     try {
          var joball = [];
          for(let i = 1 ; i < 3 ; i++) {
               const data = await axios.get('https://www.jobthai.com/th/jobs?jobtype=7&orderBy=UPDATED_AT_DESC&page='+i);
               const html = data.data;
               const $ = cheerio.load(html);
               const jobHtml = Array.from($('.msklqa-8'));
               const jobs = jobHtml.map((ele) => ({
                    link : $(ele).find('a').attr('href'),
                    jobName : $(ele).find('.frNqfE').text(),
                    companyName : $(ele).find('.gWWIiL').first().text(),
                    location : $(ele).find('#location-text').text(),
                    salary : $(ele).find('#salary-text').text(),
                    announceDate : $(ele).find('.itKEax').last().text()
               }));

               joball = [...joball , ...jobs];
          }
          // console.log(joball);
          // console.log(jobs.length);
          return res.send(joball);
     } catch(e) {
          console.log(e);
          return res.json(e);
     }
});

app.get('/test' , async(req , res) => {
     // https://th.jobsdb.com/th/th/jobs/%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5/1
     try {
          const data = await axios.get('https://th.jobsdb.com/th/th/jobs/%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5/1');
          const html = data.data;
          const $ = cheerio.load(html);
          const jobHtml = Array.from($(`div[data-automation="jobListing"]`).find('article'));
          const jobs = jobHtml.map((ele) => ({
               link : $(ele).find('.DvvsL_0').attr('href'),
               jobName : $(ele).find('.DvvsL_0').find('div').text(),
               companyName : $(ele).find(`div[data-automation="job-card-logo"] > img`).attr('alt'),
               location : $(ele).find('div[data-automation="job-card-selling-points"]').prev().text(),
               salary : '',
               announceDate : $(ele).find('div[data-automation="job-card-selling-points"]').parent().next().find('time').attr('datetime'),
          }));
          console.log(jobs);
          return res.send(jobs);
          
     } catch(e) {
          console.log(e);
          return res.json(e);
     }
});

app.get('/test2', async(req , res) => {
     // https://jobs.blognone.com/search
     try {
          const data = await axios.get('https://jobs.blognone.com/search');
          const html = data.data;
          const $ = cheerio.load(html);
          const jobHtml = Array.from($('.card'));
          const jobs = jobHtml.map((ele) => ({
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
     } catch(e) {
          console.log(e);
          return res.json(e);
     }
});

app.listen(PORT , () => console.log('y'));