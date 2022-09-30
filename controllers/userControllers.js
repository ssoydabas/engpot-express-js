import User from "../models/user.js";

import winston from "../util/winston/winston.js";

export const post_changeProfileName = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { newName } = req.body;
    const { newSurname } = req.body;

    if (!newName || !newSurname) {
      const error = new Error("Both name and surname are required.");
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("The user couldn't be found.");
      error.statusCode = 422;
      throw error;
    }

    user.personalInfo.name = newName;
    user.personalInfo.surname = newSurname;

    await user.save();

    winston.userActivityLog(
      "Changing user name",
      {
        to: {
          email: user.personalInfo.emailInfo.email,
          id: user._id,
        },
      },
      "User has changed name."
    );

    res.status(201).json({
      message: "You have successfully changed you name.",
      user,
    });
  } catch (err) {
    next(err);
  }
};

export const post_changeProfilePicture = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { imageName } = req.body;

    console.log(userId);
    console.log(imageName);

    if (!imageName) {
      const error = new Error("Please upload a valid image.");
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findById(userId);

    const oldImageName = user.personalInfo.profilePictureName;

    user.personalInfo.profilePictureName = imageName;

    user.save();

    winston.userActivityLog(
      "Changing profile picture",
      {
        to: {
          email: user.personalInfo.emailInfo.email,
          id: user._id,
        },
      },
      "User has changed profile picture."
    );

    res.status(201).json({
      message: "You have successfully changed your profile picture.",
      oldImageName: oldImageName,
    });
  } catch (err) {
    next(err);
  }
};
