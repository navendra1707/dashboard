import express from 'express'
import { AvgRelevanceSource, endYearRelevance, getAllLists, getData, intensityCountry, likelihoodRegion } from '../controllers/data.js';

const router = express.Router();

router.get('/data', getData);
router.get('/get-list', getAllLists)

router.get('/intensity-country', intensityCountry);
router.get('/likelihood-region', likelihoodRegion);
router.get('/end-year', endYearRelevance);
router.get('/avg-relevance', AvgRelevanceSource);

export default router;