import React from "react";
import "./styles.scss";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "  hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE"
const CONFIRM = "CONFIRM"
function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview).then(() => { transition(SHOW) });
  }

  function remove() {

    transition()
    transition(DELETE);
    props.cancelInterview(props.id).then(()=>{transition(EMPTY)})
  }

  console.log("##props in appoinment",props.interview)

  return (<article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=>transition(CONFIRM)}
      />
    )}
    {mode === CREATE && <Form
      student={props.student}
      interviewer={props.interviewer}
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save} />}
    {mode === SAVE && <Status message="Saving" />}
    {mode === DELETE && <Status message="Deleting" />}
    {mode === CONFIRM && <Confirm onCancel={()=>transition(SHOW,true)} onConfirm={remove} message="Are you sure you would like to delete this appoinment?" />}

    

  </article>)
}
export default Appointment;