import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Double } from 'bson';

export const EntrySchema = new mongoose.Schema({
  fid         : Schema.Types.String,
  name        : Schema.Types.String,

  lat         : Schema.Types.Number,
  lon         : Schema.Types.Number,

  electricity : Schema.Types.Boolean,

  rawIndex    : Schema.Types.Mixed
});

