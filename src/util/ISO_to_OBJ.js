const convertIsoToObject = (isoString) => {
    const toTurkeyISOString = (date) => {
      date = new Date(date).getTime();
      const turkey_Offset = 180 * 60000; // +3 hours
      
      const localISOTime = new Date(date + turkey_Offset).toISOString();
      return localISOTime;
    };
    isoString = toTurkeyISOString(isoString);
  
    const date = isoString.split("T")[0];
    const time = isoString.split("T")[1];
  
    let monthName;
    switch (date.split("-")[1]) {
      case "01":
        monthName = "Jan";
        break;
      case "02":
        monthName = "Feb";
        break;
      case "03":
        monthName = "Mar";
        break;
      case "04":
        monthName = "Apr";
        break;
      case "05":
        monthName = "May";
        break;
      case "06":
        monthName = "Jun";
        break;
      case "07":
        monthName = "Jul";
        break;
      case "08":
        monthName = "Aug";
        break;
      case "09":
        monthName = "Sep";
        break;
      case "10":
        monthName = "Oct";
        break;
      case "11":
        monthName = "Nov";
        break;
      case "12":
        monthName = "Dec";
        break;
    }
  
    const dateObject = {
      day: date.split("-")[2],
      month: date.split("-")[1],
      year: date.split("-")[0],
      hour: time.split(":")[0],
      minute: time.split(":")[1],
      monthName,
    };
  
    return dateObject;
  };
  
  export default convertIsoToObject;
  