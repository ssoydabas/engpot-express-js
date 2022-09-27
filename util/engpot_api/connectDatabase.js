import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;

const connectDatabase = (app) => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT);
    console.log(`Listening on port: ${PORT}`);
  });
};

export default connectDatabase;
