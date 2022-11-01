import ISO_TO_OBJ from "../../util/ISO_to_OBJ.js";

const mapStudentObject = (students) => {
  students = students.map((student) => {
    let timestamp = student.engPotInfo.nextLesson.date;

    const dateObject = ISO_TO_OBJ(timestamp);

    return {
      name: student.personalInfo.name,
      email: student.personalInfo.emailInfo.email,
      dateObject,
      timestamp,
    };
  });

  return students;
};

export default mapStudentObject;
