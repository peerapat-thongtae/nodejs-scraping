import axios from 'axios';
import express from 'express';

export const scrapingJobThai = async (page:number) => {
  try {
    const data = await axios.get('https://www.jobthai.com/th/jobs?jobtype=7&orderBy=UPDATED_AT_DESC&page='+page);
    const html = data.data;
    return html;
  } catch (e) {
    return e.message;
  }
}

export const scrapingJobsDB = async (page:number) => {
  try {
    const data = await axios.get(`https://th.jobsdb.com/th/jobs/information-technology/${page}`);
    const html = data.data;
    return html;
  } catch (e) {
    return e.message;
  }
}

export const scrapingJobBlognone = async (page:number) => {
  try {
    const data = await axios.get(`https://jobs.blognone.com/search?page=${page}`);
    const html = data.data;
    return html;
  } catch(e) {
    return e.message;
  }
}