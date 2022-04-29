import { Schema } from "mongoose";

export const EdgeSchema = new Schema({
  source: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
}, {_id: false});
