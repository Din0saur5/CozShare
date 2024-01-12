export function getCurrentTimestampWithTimezone() {
    const date = new Date();
    const offset = -date.getTimezoneOffset();
    const offsetSign = offset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
    const timezone = offsetSign + offsetHours + ':' + offsetMinutes;

    const currentDate = date.getFullYear() + 
           '-' + String(date.getMonth() + 1).padStart(2, '0') + 
           '-' + String(date.getDate()).padStart(2, '0') + 
           ' ' + String(date.getHours()).padStart(2, '0') + 
           ':' + String(date.getMinutes()).padStart(2, '0') + 
           ':' + String(date.getSeconds()).padStart(2, '0') + 
           '.' + String(date.getMilliseconds()).padStart(3, '0') + 
           timezone;
    console.log(currentDate)
    return currentDate
}

// const currentTimestamp = getCurrentTimestampWithTimezone();
// console.log(currentTimestamp);