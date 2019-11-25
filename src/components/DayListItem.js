import React from "react";
import classNames from "classnames"

import "components/DayListItem.scss";

export default function DayListItem({ name, spots, selected, setDay }) {
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "say-list__item--full": !spots
  })

  return (
    <li className={dayClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spots}</h3>
    </li>
  );
}