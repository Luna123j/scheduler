import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {

  //use useReducer hook set the state
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  //get date from api
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {

      //set date into state
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data });

    });
  }, [])

  //function used to update appointment spots change
  const updateSpots = function(state, appointments) {
    const dayObj = state.days.find((d) => d.name === state.day)

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      };
    }
    const newDay = { ...dayObj, spots };
    const days = state.days.map((d) => d.name === state.day ? newDay : d);
    return days;
  }

  //function used to put new interview info into api
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
        const days = updateSpots(state, appointments);
        dispatch({ type: SET_INTERVIEW, id, interview, days });
      }
      )
  }

  //function used to delete selected interview info from api
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
        dispatch({ type: SET_INTERVIEW, id, interview: null, days })
      }
      )

  }

  return { state, setDay, bookInterview, cancelInterview }
}