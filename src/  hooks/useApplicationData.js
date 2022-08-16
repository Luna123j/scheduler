import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return {...state,day:action.day}
      case SET_APPLICATION_DATA:
        return { ...state, days:action.days ,appointments:action.appointments,interviewers:action.interviewers}
      case SET_INTERVIEW: {
        return {...state,appointments:{...state.appointments,[action.id]: {...state.appointments[action.id],
              interview: action.interview}}}
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state,dispatch] = useReducer(reducer,{
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
  console.log("&&&&&&&&&&&&&&&&&&",state)

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log("api days", all[0])
      // setState(prev => ({ ...prev, days: [...all[0].data], appointments: { ...all[1].data }, interviewers: { ...all[2].data } }))
      
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data , interviewers: all[2].data });
      console.log(state)
    });
  }, [])

  function bookInterview(id, interview) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        state.days.filter((d) => { if (d.name === state.day) d.spots -=1 });//need to fix this for edit
        // const days=state.days;
        // setState({ ...state, days });
        // setState({ ...state, appointments });
        dispatch({ type: SET_INTERVIEW, id, interview });
        // console.log("*****************",state)

      }
      )
  }

  function cancelInterview(id) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        state.days.filter((d) => { if (d.name === state.day) d.spots += 1});
        // const days=state.days;
        // setState({ ...state, days });
        // setState({ ...state, appointments });

        dispatch({ type: SET_INTERVIEW, id,interview:null })

      }
      )

  }

  return { state, setDay, bookInterview, cancelInterview }
}