import React, { useReducer, useEffect } from "react";
import axios from "axios";

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
      dayArr[changeDay].spots = (action.interview ? dayArr[changeDay].spots - 1 : dayArr[changeDay].spots + 1)

      return {
        ...state,
        appointments: {
          ...state.appointments,
          [action.id]: {
            ...state.appointments[action.id],
            interview: { ...action.interview }
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

export default function useApplicationData() {

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
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      })

    })
      .catch(err => console.log(err));

    const sock = new WebSocket("ws://localhost:8001");

    // Open WebSocket

    sock.addEventListener("open", () => {
      console.log("Connected to server");
    })

    // Respond to messages from server

    sock.addEventListener("message", msg => {
      let msgObj = JSON.parse(msg.data);
      console.log(msgObj);
      msgObj.type === SET_INTERVIEW && dispatch({ ...msgObj });
    })

    // close websocket when component unmounts

    return () => {
      sock.close()
    }

  }, [])

  const setDay = day => dispatch({ type: SET_DAY, day });

  const bookInterview = function (id, interview) {
    if (!interview.student || !interview.interviewer) {
      return Promise.reject("Name or interviewer field left blank")
    } else {
      return axios.put(`/api/appointments/${id}`, { interview })
    }

  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}
