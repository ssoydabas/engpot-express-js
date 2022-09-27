import mongoose from "mongoose";
const Schema = mongoose.Schema;

const erasedUserSchema = new Schema({
  personalInfo: {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    emailInfo: {
      email: {
        type: String,
      },
    },
  },
  engPotInfo: {
    status: {
      type: String,
      enum: ["user", "student", "teacher", "admin"],
      default: "user",
    },
    engPotDetails: {
      lessonsTaken: { type: Number, default: 0 },
      engPotToken: { type: Number, default: 0 },
      lessonsEarned: { type: Number, default: 0 },
      lessonsCancelled: { type: Number, default: 0 },
      lessonsPostponed: { type: Number, default: 0 },
      lessonsGhosted: { type: Number, default: 0 },
    },
  },
});

const ErasedUser = mongoose.model("ErasedUser", erasedUserSchema);

export default ErasedUser;
