export function getAppointmentsForDay(state, day) {

  if (state.days.length > 0) {
    const dayObj = state.days.filter(obj => obj.name === day);
    if (dayObj.length > 0) {
      const appointmentsArr = dayObj[0].appointments;
      const daysAppointments = appointmentsArr.map(appt => state.appointments[appt]);
      return daysAppointments;
    } else {
      return [];
    }
  } else {
    return [];
  }
}