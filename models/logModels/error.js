import mongoose from "mongoose";
const Schema = mongoose.Schema;

const errorSchema = new Schema({
  level: { type: String },
  errorStatusCode: { type: Number },
  errorMessage: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Error = mongoose.model("Error", errorSchema);

export default Error;
