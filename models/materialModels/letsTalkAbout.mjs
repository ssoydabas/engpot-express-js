import mongoose from "mongoose";
const Schema = mongoose.Schema;

const letsTalkAbout = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    elementaryQuestions: { type: Array },
    preIntermediateQuestions: { type: Array },
    intermediateQuestions: { type: Array },
});

export const LetsTalkAbout = mongoose.model("LetsTalkAbout", letsTalkAbout);