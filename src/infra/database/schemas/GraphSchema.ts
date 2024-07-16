import { Document, Schema, Model, model } from "mongoose";
import { IGraph } from "../../../interfaces/IGraph";
import { EdgeSchema } from "./EdgeSchema";

export interface IGraphModel extends IGraph, Document {
  id: number;
}

export const GraphSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  edges: {
    type: [EdgeSchema],
    required: true,
  },
});

export const GraphModel: Model<IGraphModel> = model<IGraphModel>(
  "Graph",
  GraphSchema
);
