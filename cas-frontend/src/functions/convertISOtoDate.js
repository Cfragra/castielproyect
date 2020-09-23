export function convertISOtoDate(isoDate) {
  var date = new Date(isoDate);
  var day = date.getDate();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dateStr = day + '/' + month + '/' + year;
  return dateStr;
}
