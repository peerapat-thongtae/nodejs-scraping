import axios from 'axios';
import express from 'express';

export const scrapingJobThai = async (page:number) => {
  try {
    const data = await axios.get('https://www.jobthai.com/th/jobs?subjobtype=146%2C155&orderBy=UPDATED_AT_DESC&page='+page);
    const html = data.data;
    return html;
  } catch (e) {
    return e.message;
  }
}

export const scrapingJobsDB = async (page:number) => {
  try {
    const data = await axios.get(`https://th.jobsdb.com/th/job-list/information-technology/programming-software-development/${page}?sort=createdAt`);
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