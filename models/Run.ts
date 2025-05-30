import mongoose, { Schema } from "mongoose";

const RunSchema = new Schema(
  {
    language: String,
    languageId: Number,
    code: String,
    input: String,
    output: String,
  },
  { timestamps: true }
);
export interface RunType {
  _id: string;
  language: string;
  code: string;
  input?: string;
  output: string;
  createdAt: string;
}

export const Run = mongoose.models.Run || mongoose.model("Run", RunSchema);