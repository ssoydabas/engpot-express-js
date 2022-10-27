const finalizeLesson = (student, lessonStatus) => {
  const engPotCreditsPerLesson = 10;

  if (lessonStatus === "done") {
    student.engPotInfo.engPotDetails.engPotCredits -= engPotCreditsPerLesson;

    student.engPotInfo.engPotDetails.lessonsTaken++;
  }

  if (lessonStatus === "cancelled") {
    student.engPotInfo.engPotDetails.lessonsCancelled++;
  }

  if (lessonStatus === "postponed") {
    student.engPotInfo.engPotDetails.lessonsPostponed++;
  }

  if (lessonStatus === "ghosted") {
    student.engPotInfo.engPotDetails.lessonsGhosted++;
  }

  return student;
};

export default finalizeLesson;
