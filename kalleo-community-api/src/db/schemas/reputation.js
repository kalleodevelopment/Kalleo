import mongoose from 'mongoose';
import reputationCategories from '../constants/reputationCategories';
import reputationTypes from '../constants/reputationTypes';

export default new mongoose.Schema({
  _id: {
    auto: false,
  },
  level: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  type: {
    type: String,
    enum: {
      values: Object.keys(reputationTypes),
    },
    required: true,
  },
  category: {
    type: String,
    enum: {
      values: Object.keys(reputationCategories),
    },
    required: true,
  },
});
