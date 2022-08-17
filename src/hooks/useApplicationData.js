import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {


  

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })


  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });
  // const setDay = day => setState({ ...state, day });
  const setDay = (day) => dispatch({ type: SET_DAY, day });
  // console.log("&&&&&&&&&&&&&&&&&&",state)

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      // console.log("api days", all[0])

      // setState(prev => ({ ...prev, days: [...all[0].data], appointments: { ...all[1].data }, interviewers: { ...all[2].data } }))

      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });
      // console.log(state)
    });
  }, [])

  const updateSpots = function(state, appointments) {
    const dayObj = state.days.find((d) => d.name === state.day)

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    const newDay = { ...dayObj, spots };
    const days = state.days.map((d) => d.name === state.day ? newDay : d);
    return days;
  }

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
        const days = updateSpots(state, appointments)
        dispatch({ type: SET_INTERVIEW, id, interview, days });
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

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {

        const days = updateSpots(state, appointments)
        dispatch({ type: SET_INTERVIEW, id, interview: null,days })
      }
      )

  }

  return { state, setDay, bookInterview, cancelInterview }
}