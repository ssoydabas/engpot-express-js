import mongoose from "mongoose";
const Schema = mongoose.Schema;

const publicScheduleSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  events: { type: Array },
});

const PublicSchedule = mongoose.model("PublicSchedule", publicScheduleSchema);

export default PublicSchedule;
