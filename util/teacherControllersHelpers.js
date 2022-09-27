export const updateStudentNextLesson = (student, date, time, social, tense, structure, extra) => {

    // console.log(
    //     new Date(Date.UTC(date.split("-")[0], date.split("-")[1]-1, date.split("-")[2], time.split(":")[0], time.split(":")[1]))
    // );
    
    student.engPotInfo.nextLesson.date = new Date(Date.UTC(date.split("-")[0], date.split("-")[1]-1, date.split("-")[2], time.split(":")[0], time.split(":")[1]));

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