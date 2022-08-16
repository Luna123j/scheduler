import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log("api days", all[0])
      setState(prev => ({ ...prev, days: [...all[0].data], appointments: { ...all[1].data }, interviewers: { ...all[2].data } }))
    });
  }, [])


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        state.days.filter((d) => { if (d.name === state.day) d.spots -=1 });
        const days=state.days;
        setState({ ...state, days });
        setState({ ...state, appointments });
        // console.log("*****************",state.days)
      }
      )
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview: null })
      .then(() => {
        state.days.filter((d) => { if (d.name === state.day) d.spots += 1});
        const days=state.days;
        setState({ ...state, days });
        setState({ ...state, appointments });
        // console.log("*****************",state.days)

      }
      )

  }

  return { state, setDay, bookInterview, cancelInterview }
}