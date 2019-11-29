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
              spots: (action.interview ? item.spots - 1 : item.spots + 1)
            }
          }
        })


        return {
          ...state,
          id: action.id,
          appointments: {
            ...state.appointments,
            [action.id]: {
              ...state.appointments[action.id],
              interview: { ...action.interview }
            }
          },
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
      dispatch(msgObj);
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
