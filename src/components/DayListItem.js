import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let dayClass = classNames('li',{
    'day-list__item':true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  });
  const formatSpots = ()=>{
    if(props.spots === 0){
      return 'no spots remaining'
    }
    if(props.spots === 1){
      return '1 spot remaining'
    }else{
      return `${props.spots} spots remaining`
    }
  }
  return (
    <li className = {dayClass} data-testid = "day">
      <h2 onClick={()=>{props.setDay(props.name)}} className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}