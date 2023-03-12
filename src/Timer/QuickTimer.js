import React from "react";
import { Link } from "react-router-dom";
import { usePeridiocallyUpdatingTime } from "./usePeridiocallyUpdatingTime";
import { Counter } from "./Counter";
export default function QuickTimer({ href, holidays }) {
  const time = usePeridiocallyUpdatingTime(1000);
  const unitDefinitions = [
    { name: "Viikot", short: "wk", divider: 1000 * 60 * 60 * 24 * 7 },
    { name: "Päivät", short: "d", divider: 1000 * 60 * 60 * 24 },
    { name: "Tunnit", short: "h", divider: 1000 * 60 * 60 },
    { name: "Minuutit", short: "min", divider: 1000 * 60 },
    { name: "Sekuntit", short: "s", divider: 1000 },
    { name: "Millisekuntit", short: "ms", divider: 1 },
  ];
  const holiday = holidays[0];
  const units = unitDefinitions.slice(0, 4);
  return (
    <div className="quickBox anim active">
      <div className="quickBoxLeft">
        <h1 className="quickTitle">Laskuri:</h1>
        <div className="quickContent">
          <Counter time={time} units={units} holidayObject={holiday} key={holiday.startName}></Counter>
        </div>
      </div>
      <Link to={href} className="quickBoxRight">
        <div className="quickWhite arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="1px"
              stroke="white"
              d="M5.88 4.12L13.76 12l-7.88 7.88L8 22l10-10L8 2z"
            />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
