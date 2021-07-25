import express from 'express';
import BusinessService from '../service/business-service.mjs';
import {
  currencyFormatter,
  avgPriceListFormatter,
  makePercentFormatter,
  top5PerMonthFormatter,
} from './view-data.mjs';

const DEFAULT_PERCENT = 0.3;

const apiRouter = express.Router();

apiRouter.get('/avgPrice/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.type('json');
  const bs = new BusinessService();
  const avgPrice = await bs.getAvgPricePerList();
  const response = await avgPriceListFormatter(avgPrice);
  res.send(response);
});

apiRouter.get('/makePercent/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.type('json');
  const bs = new BusinessService();
  const avgPrice = await bs.getMakePercent();
  const response = await makePercentFormatter(avgPrice);
  res.send(response);
});

apiRouter.get('/top30price/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.type('json');
  const bs = new BusinessService();
  const percent = req.params.percent || DEFAULT_PERCENT;
  const top30price = await bs.getTop30Total(percent);
  const response = currencyFormatter(top30price);
  res.send({ 'Average price of top 30': response });
});

apiRouter.get('/top5perMonth/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.type('json');
  const bs = new BusinessService();
  const top5perMonth = await bs.getTop5PerMonth();
  const response = await top5PerMonthFormatter(top5perMonth);
  res.send(response);
});

apiRouter.post('/upload/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.type('json');
  console.log(`files uploaded ${req.body} `);
  res.send({done: 'uploaded'});
});

export default apiRouter;
