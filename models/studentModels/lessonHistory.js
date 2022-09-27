import mongoose from "mongoose";
const Schema = mongoose.Schema;

const lessonHistory = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date },
  subjects: {
    social: { type: String },
    tense: { type: String },
    structure: { type: String },
    extra: { type: String },
  },
  status: {
    type: String,
    enum: ["done", "cancelled", "postponed", "ghosted"],
    required: true,
  },
});

const LessonHistory = mongoose.model("LessonHistory", lessonHistory);

export default LessonHistory;
