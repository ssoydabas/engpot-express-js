import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentsFromEmailMe = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const StudentsFromEmailMe = mongoose.model(
  "StudentsFromEmailMe",
  studentsFromEmailMe
);

export default StudentsFromEmailMe;
