export default {
  setDateStringToDate(string) {
    var year = string.substring(0, 4);
    var month = string.substring(5, 7);
    var day = string.substring(8, 10);
    var hour = string.substring(12, 14);
    var minute = string.substring(15, 17);
    var second = string.substring(18, 20);
     return new Date(year, month, day, hour, minute, second);
  },
  getDaysBetween(endDate,startDate){
    var days=(endDate.getTime() - startDate.getTime())/(1*24*60*60*1000);
    return days;
  }
}
