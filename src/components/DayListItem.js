import React from "react";
import classNames from "classnames"

import "components/DayListItem.scss";

export default function DayListItem({ name, spots, selected, setDay }) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": !spots
  })

  const formatSpots = (spots) => {
    if (spots === 0) {
      return "no spots remaining"
    } else if (spots === 1) {
      return "1 spot remaining"
    } else if (spots > 1) {
      return `${spots} spots remaining`
    } else {
      return "An error has occured."
    }
  }

  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}