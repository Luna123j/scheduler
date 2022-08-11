import React from "react";
import "./styles.scss";
import Show from "./Show";
import Header from "./Header";
import Empty from "./Empty";

function Appointment(props) {
  return (<article className="appointment">
    <Header time={props.time}/>
    {props.interview ? <Show interviewer = {props.interview.interviewer} student={props.interview.student}/> : <Empty />}
  </article>)
}
export default Appointment;