import React from "react";
import "./styles.scss";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE"
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE ="ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE,true);
    props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch(error=>transition(ERROR_SAVE,true));
  }

  function remove() {
    transition(DELETE,true);
    props.cancelInterview(props.id).then(() => transition(EMPTY)).catch(error=>transition(ERROR_DELETE,true));
  }

  function goBack(){
    back();
  }

  return (<article className="appointment" data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={()=>transition(EDIT)}
      />
    )}
    {mode === CREATE && <Form
      student={props.student}
      interviewer={props.interviewer}
      interviewers={props.interviewers}
      onCancel={goBack}
      onSave={save} />}
    {mode === SAVE && <Status message="Saving" />}
    {mode === DELETE && <Status message="Deleting" />}
    {mode === CONFIRM && <Confirm onCancel={goBack} onConfirm={remove} message="Are you sure you would like to delete this appoinment?" />}
    {mode === EDIT && <Form
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onCancel={goBack}
      onSave={save}
    />}
    {mode ===ERROR_SAVE && <Error message="Error" onClose={goBack} />}
    {mode ===ERROR_DELETE && <Error message="Error" onClose={goBack} />}



  </article>)
}
export default Appointment;