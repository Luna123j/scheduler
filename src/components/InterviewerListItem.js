import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

function InterviewerListItem(props){

  let interviwerClass = classNames('li',{
    'interviewers__item': !props.selected,
    'interviewers__item--selected' : props.selected}
  )
  

 return (<li onClick={props.setInterviewer} className={interviwerClass}>
 <img
   className="interviewers__item-image"
   src={props.avatar}
   alt={props.name}
 />
 {props.selected ? props.name : ""}
</li>)
}

export default InterviewerListItem;