import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";
import PropTypes from 'prop-types';
function InterviewerList (props){
  const interviewer = props.interviewers.map(interviewer=>
    <InterviewerListItem 
    key={interviewer.id} 
    name={interviewer.name} 
    avatar={interviewer.avatar} 
    selected={props.value ===interviewer.id}
    setInterviewer={()=>props.onChange(interviewer.id)}
    />
  )

  return (<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewer}</ul>
</section>)
}

//the props of interviewers must an array
InterviewerList.propTypes={
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;