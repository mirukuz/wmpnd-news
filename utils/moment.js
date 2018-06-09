const minutesWithLeadingZeros = (dt) => {
  return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}
export const getHourAndMinutes = (e) => {
  let date = new Date(e);
  return `${date.getHours()}:${minutesWithLeadingZeros(date)}`
}
