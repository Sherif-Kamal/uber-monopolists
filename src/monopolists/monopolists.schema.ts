const mongoose = require('mongoose');

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const MonopolistsSchema = new mongoose.Schema({

  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  month: {type:Number,enum: MONTHS},
  year: {type: Number, index : true},
  counter: {type: Number,default: 0},
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date }
});
