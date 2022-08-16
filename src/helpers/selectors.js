function getAppointmentsForDay(state, day) {
  const getAppointmentsID = state.days.filter(d => d.name === day);
  const filteredAppointment = [];
  if (getAppointmentsID.length > 0) {
    getAppointmentsID[0].appointments.forEach((id) => {
      filteredAppointment.push(state.appointments[id]);
    })
  }
  return filteredAppointment;
}

function getInterview(state, interview) {
  let filteredInterview = null;
  if (interview) {
    const getInterviewer = state.interviewers[interview.interviewer];
    filteredInterview = { student: interview.student, interviewer: getInterviewer };
  }
  return filteredInterview;
}

function getInterviewersForDay(state, day) {
  // console.log("selector",state,day)

  const getInterviewersId = state.days.filter(d => d.name === day);
  const filteredInterviewer = [];
  if (getInterviewersId.length > 0) {
    getInterviewersId[0].interviewers.forEach((id) => {
      filteredInterviewer.push(state.interviewers[id]);
    })
  }
  return filteredInterviewer;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
