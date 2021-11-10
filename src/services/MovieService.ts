import axios from 'axios';
import express from 'express';

export const scrapingMajorMovie = async () => {
  try {
    const data = await axios.get('https://movie.thaiware.com');
    const html = data.data;
    return html;
  } catch (e) {
    return e.message;
  }
}