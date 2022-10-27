const updateStudentNextLesson = (
  student,
  timestamp,
  social,
  tense,
  structure,
  extra
) => {
  student.engPotInfo.nextLesson.date = new Date(timestamp);

  student.engPotInfo.nextLesson.subjects = {
    social: social,
    tense: tense,
    structure: structure,
    extra: extra,
  };

  student.engPotInfo.nextLesson.hasPlannedLesson = true;
};

export default updateStudentNextLesson;
