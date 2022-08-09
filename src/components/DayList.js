import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {

  const listItem = props.days.map(day=>
      <DayListItem 
        name ={day.name} 
        spots = {day.spots} 
        key={props.day.id}
        selected={day.name === props.day}
        setDay={props.setDay}/>
  )

  return <ul>{listItem}</ul>

}