import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userActivitySchema = new Schema({
    message: {type: String},
    from: {
        email: {type: String},
        id: {type: Schema.Types.ObjectId}
    },
    to: {
        email: {type: String},
        id: {type: Schema.Types.ObjectId}
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

export default UserActivity;