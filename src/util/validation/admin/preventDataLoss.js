const preventDataLoss = (updatedUserInfo, user) => {
  if (updatedUserInfo.engPotInfo.engPotDetails.lessonsTaken === "") {
    updatedUserInfo.engPotInfo.engPotDetails.lessonsTaken =
      user.engPotInfo.engPotDetails.lessonsTaken;
  }
  if (updatedUserInfo.engPotInfo.engPotDetails.speakingLessonsTaken === "") {
    updatedUserInfo.engPotInfo.engPotDetails.speakingLessonsTaken =
      user.engPotInfo.engPotDetails.speakingLessonsTaken;
  }
  if (updatedUserInfo.engPotInfo.engPotDetails.lessonsEarned === "") {
    updatedUserInfo.engPotInfo.engPotDetails.lessonsEarned =
      user.engPotInfo.engPotDetails.lessonsEarned;
  }
  if (updatedUserInfo.engPotInfo.engPotDetails.engPotToken === "") {
    updatedUserInfo.engPotInfo.engPotDetails.engPotToken =
      user.engPotInfo.engPotDetails.engPotToken;
  }
  if (updatedUserInfo.engPotInfo.engPotDetails.lessonsCancelled === "") {
    updatedUserInfo.engPotInfo.engPotDetails.lessonsCancelled =
      user.engPotInfo.engPotDetails.lessonsCancelled;
  }
  if (updatedUserInfo.engPotInfo.engPotDetails.lessonsPostponed === "") {
    updatedUserInfo.engPotInfo.engPotDetails.lessonsPostponed =
      user.engPotInfo.engPotDetails.lessonsPostponed;
  }
  if (updatedUserInfo.engPotInfo.engPotDetails.lessonsGhosted === "") {
    updatedUserInfo.engPotInfo.engPotDetails.lessonsGhosted =
      user.engPotInfo.engPotDetails.lessonsGhosted;
  }
  if (updatedUserInfo.engPotInfo.engPotDetails.engPotCredits === "") {
    updatedUserInfo.engPotInfo.engPotDetails.engPotCredits =
      user.engPotInfo.engPotDetails.engPotCredits;
  }
};

export default preventDataLoss;
