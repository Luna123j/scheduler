//help to filter appointment for specific day
function getAppointmentsForDay(state, day) {

  const getAppointmentsID = state.days.filter(d => d.name === day);
  const filteredAppointment = [];

  if (getAppointmentsID.length > 0) {
    getAppointmentsID[0].appointments.forEach((id) => {
      filteredAppointment.push(state.appointments[id]);
    })
  };

  return filteredAppointment;
}

//help to get interview info with student's name and interviewer's name
function getInterview(state, interview) {

  let filteredInterview = null;

  if (interview) {
    const getInterviewer = state.interviewers[interview.interviewer];
    filteredInterview = { student: interview.student, interviewer: getInterviewer };
  };

  return filteredInterview;
}

//help tp filter interviewers for specific day
function getInterviewersForDay(state, day) {

  const getInterviewersId = state.days.filter(d => d.name === day);
  const filteredInterviewer = [];

  if (getInterviewersId.length > 0) {
    getInterviewersId[0].interviewers.forEach((id) => {
      filteredInterviewer.push(state.interviewers[id]);
    });
  };

  return filteredInterviewer;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
