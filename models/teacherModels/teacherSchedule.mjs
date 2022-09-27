import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    week: {
        monday: {
            "09:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "09:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "22:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
        },
        tuesday: {
            "09:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "09:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "22:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
        },
        wednesday: {
            "09:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "09:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "22:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
        },
        thursday: {
            "09:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "09:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "22:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
        },
        friday: {
            "09:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "09:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "22:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
        },
        saturday: {
            "09:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "09:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "22:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
        },
        sunday: {
            "09:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "09:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "10:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "11:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "12:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "13:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "14:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "15:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "16:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "17:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "18:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "19:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "20:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "21:30": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
            "22:00": {
                studentName: {
                    type: String,
                    default: ""
                },
            },
        },
    },
});

export const TeacherSchedule = mongoose.model("TeacherSchedule", userSchema);