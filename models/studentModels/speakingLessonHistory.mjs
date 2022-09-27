import mongoose from "mongoose";
const Schema = mongoose.Schema;

const speakingLessonHistory = new Schema({
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
    subjects: { type: String },
    status: {
        type: String,
        enum: ["done", "cancelled", "postponed", "ghosted"],
        required: true,
    },
});

export const SpeakingLessonHistory = mongoose.model("SpeakingLessonHistory", speakingLessonHistory);