function getAppointmentsForDay(state, day) {
  const getAppointmentsID = state.days.filter(d => d.name === day);
  const filteredAppointment = [];
  if (getAppointmentsID.length>0) {
    getAppointmentsID[0].appointments.forEach((id) => {
      filteredAppointment.push(state.appointments[id]);
    })
  }
  return filteredAppointment;
}

export { getAppointmentsForDay };
