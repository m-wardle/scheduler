import React, { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
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
        let daysArr = state.days.map((item, index) => {
          if (item.name !== state.day) {
            return item
          } else {
            return {
              ...item,
              spots: (action.add ? item.spots - 1 : item.spots + 1)
            }
          }
        })

        return {
          ...state,
          id: action.id,
          appointments: action.appointments,
          days: daysArr
        }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })

    })
      .catch(err => console.log(err));
  }, [])

  const setDay = day => dispatch({ type: SET_DAY, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    if (!interview.student || !interview.interviewer) {
      return Promise.reject("Name or interviewer field left blank")
    } else {
      return axios.put(`/api/appointments/${id}`, { interview })
        .then(dispatch({ type: SET_INTERVIEW, id, appointments, add: true }));
    }

  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(dispatch({ type: SET_INTERVIEW, id, appointments, add: false }));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
