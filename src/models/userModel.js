import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        required: true,
        unique: true,
        index: true,
      },
      confirmed: {
        type: Boolean,
        required: true,
        default: false,
      },
      emailConfirmationCode: {
        type: String,
      },
    },
    profilePictureName: {
      type: String,
      default: "EngPotLogo.jpeg",
    },
    passwordInfo: {
      password: {
        type: String,
        required: true,
      },
      resetPasswordInfo: {
        resetPasswordToken: { type: String },
        resetPasswordExpiration: { type: Date },
      },
    },
  },
  engPotInfo: {
    status: {
      type: String,
      enum: ["user", "student", "teacher", "admin"],
      default: "user",
    },

    studentPlan: { type: String, default: "engpot" },

    studentLevel: {
      type: String,
      enum: ["elementary", "pre-intermediate", "intermediate"],
      default: "elementary",
    },

    hasTeacher: { type: Boolean, default: false },

    engPotDetails: {
      lessonsTaken: { type: Number, default: 0 },
      speakingLessonsTaken: { type: Number, default: 0 },
      engPotToken: { type: Number, default: 0 },
      lessonsEarned: { type: Number, default: 0 },

      lessonsCancelled: { type: Number, default: 0 },
      lessonsPostponed: { type: Number, default: 0 },
      lessonsGhosted: { type: Number, default: 0 },

      engPotCredits: { type: Number, default: 0 },
    },

    nextLesson: {
      date: { type: Date },
      subjects: {
        social: { type: String },
        tense: { type: String },
        structure: { type: String },
        extra: { type: String },
      },
      hasPlannedLesson: { type: Boolean, default: false },
    },

    speakingLesson: {
      doesHaveSpeakingLesson: { type: Boolean, default: false },
      doesHavePlannedSpeakingLesson: { type: Boolean, default: false },
      speakingSubjects: { type: String },
      date: { type: Date },
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
