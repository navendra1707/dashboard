import Data from "../models/data.js";

export const getData = async (req, res) => {
  try {
    const data = await Data.find();

    res.status(200).json({
      data: data
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
};

export const intensityCountry = async (req, res) => {
  try {
    const { filterType, filterValue } = req.query;

    const data = await Data.aggregate([
      { "$match": { [filterType]: filterValue } },
      {
        $group:
        {
          _id: "$country" ,
          sum: { $sum: "$intensity" }
        }
      }
    ]);

    res.status(200).json({
      data: data
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

export const likelihoodRegion = async (req, res) => {
  try {
    const { filterType, filterValue } = req.query;

    const data = await Data.aggregate([
      { "$match": { [filterType]: filterValue } },
      {
        $group:
        {
          _id: "$region" ,
          sum: { $sum: "$likelihood" }
        }
      }
    ]);

    res.status(200).json({
      data: data
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

export const AvgRelevanceSource = async (req, res) => {
  try {
    const { filterType, filterValue } = req.query;

    const data = await Data.aggregate([
      { "$match": { [filterType]: filterValue } },
      {
        $group:
        {
          _id: "$source" ,
          sum: { $avg: "$relevance" }
        }
      }
    ]);

    res.status(200).json({
      data: data
    })
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

export const endYearRelevance = async (req, res) => {
  try {
    const { filterType, filterValue } = req.query;

    const data = await Data.aggregate([
      { "$match": { [filterType]: filterValue } },
      {
        $group:
        {
          _id: "$pestle" ,
          sum: { $sum: "$relevance" }
        }
      }
    ]);

    res.status(200).json({
      data
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

export const getAllLists = async (req, res) => {
  try {
    const endYears = await Data.distinct("end_year");
    const topics = await Data.distinct("topic");
    const countries = await Data.distinct("country");
    const sectors = await Data.distinct("sector");
    const regions = await Data.distinct("region");
    const sources = await Data.distinct("source");

    res.status(200).json({
      endYears,
      topics,
      countries,
      sectors,
      regions,
      sources,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};