import React, { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/application"

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
      .catch(err => Promise.resolve()); // Was getting strange errors in tests saying connection was refused despite tests passing. 

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
    return axios.put(`/api/appointments/${id}`, { interview })
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
