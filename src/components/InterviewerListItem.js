import React from "react";
import classNames from "classnames"

import "components/InterviewerListItem.scss";

export default function InterviewerListItem({ name, avatar, selected, onChange }) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li className={interviewerClass} onClick={onChange}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}