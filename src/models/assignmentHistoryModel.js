import mongoose from "mongoose";
const Schema = mongoose.Schema;

const assignment = new Schema({
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
  assignmentInfo: {
    title: { type: String, required: true },
    instructions: { type: String, required: true },
    deadline: { type: Date },
    assignedDate: { type: Date, default: Date.now },
    isDone: { type: Boolean, default: false },
    doneOnTime: { type: Boolean },
  },
  teacherInfo: {
    mark: { type: Number },
    teacherNote: { type: String },
  },
  studentInfo: {
    title: { type: String },
    answer: { type: String },
    answeredDate: { type: Date },
  },
});

const Assignment = mongoose.model("Assignment", assignment);

export default Assignment;
