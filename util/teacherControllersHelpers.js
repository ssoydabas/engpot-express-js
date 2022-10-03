export const updateStudentNextLesson = (student, timestamp, social, tense, structure, extra) => {

    student.engPotInfo.nextLesson.date = new Date(timestamp);

    student.engPotInfo.nextLesson.subjects = {
        social: social,
        tense: tense,
        structure: structure,
        extra: extra,
    };

    student.engPotInfo.nextLesson.hasPlannedLesson = true;

};

export const divideDateStringIntoUnitsObject = (dateString) => {

    dateString = dateString.toISOString();

    const date = dateString.split("T")[0];
    const time = dateString.split("T")[1];
    
    const dateObject = {
        day: date.split("-")[2],
        month: date.split("-")[1],
        year: date.split("-")[0],
        hour: time.split(":")[0],
        minute: time.split(":")[1],
    };

    return dateObject;

};