import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teacherStudents = new Schema({
  teacherId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

const TeacherStudent = mongoose.model("TeacherStudent", teacherStudents);

export default TeacherStudent;
