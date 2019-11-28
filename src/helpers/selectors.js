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

export function getInterviewersForDay(state, day) {

  if (state.days.length > 0) {
    const dayObj = state.days.filter(obj => obj.name === day);
    if (dayObj.length > 0) {
      const interviewersArr = dayObj[0].interviewers;
      const daysInterviewers = interviewersArr.map(int => state.interviewers[int]);
      return daysInterviewers;
    } else {
      return [];
    }
  } else {
    return [];
  }
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    "student": interview.student,
    "interviewer": {
      "id": interview.interviewer,
      "name": interviewer.name,
      "avatar": interviewer.avatar
    }
  }
}

