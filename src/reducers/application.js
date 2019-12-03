const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      }
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      }
    case SET_INTERVIEW:
      let changeDay;

      if (1 <= action.id && action.id <= 5) {
        changeDay = 0
      } else if (6 <= action.id && action.id <= 10) {
        changeDay = 1
      } else if (11 <= action.id && action.id <= 15) {
        changeDay = 2
      } else if (16 <= action.id && action.id <= 20) {
        changeDay = 3
      } else if (21 <= action.id && action.id <= 25) {
        changeDay = 4
      }

      let dayArr = [...state.days];
      console.log(state.appointments[action.id].interview)

      dayArr[changeDay].spots = (action.interview ?
        (state.appointments[action.id].interview ?
          dayArr[changeDay].spots :
          dayArr[changeDay].spots - 1) :
        dayArr[changeDay].spots + 1)


      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: action.interview
          }
        },
        days: [...dayArr]
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      )
  }
}

export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
}
