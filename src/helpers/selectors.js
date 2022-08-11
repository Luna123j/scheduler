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

export { getAppointmentsForDay, getInterview };
