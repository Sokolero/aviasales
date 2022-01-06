import React from "react";

// ===========================================================================
// --- get suffics by stops count ----------------------------------
const getSuffics = (count) => {
  switch (count) {
    case 1:
      return "ка";
    case 2:
    case 3:
    case 4:
      return "ки";
    default:
      return "ок"
  }
};

// ---- get departure/ destination time as "14:15" -----------------------------
export const getFormatedTime = (date) =>
  [String(date.getUTCHours()).padStart(2, "0"), String(date.getUTCMinutes()).padStart(2, "0")].join(":");

// ----- get time interval formated as "14.15 - 22.10"--------------------------
export const getFlightInterval = (date, duration) => {
  const departure = new Date(date);
  const destination = new Date(departure.getTime() + duration * 60000);

  return [getFormatedTime(departure), getFormatedTime(destination)].join(" - ");
};

//------ get duration of the flight formated as "21ч 35м"----------------------
export const getFormatedDuration = (duration) => {
  let hours = String(Math.floor(duration / 60)).padStart(2, "0");
  let minutes = String(duration % 60).padStart(2, 0);

  return `${hours}ч ${minutes}м`;
};



// ========= Component =========================================================
const Route = ({ route: { origin, destination, date, stops, duration } }) => {

// -----------------------------------------
  const transfersCount = stops.length;
// -----------------------------------------
  return (
      <div className="route">
        <div className="route__col">
          <div className="route-info__top" data-type="orig-dest">{ `${origin} - ${destination}` }</div>
          <div className="route-info__bottom" data-type="flight-int">{ getFlightInterval(date, duration) }</div>
        </div>
        <div className="route__col">
          <div className="route-info__top">В пути</div>
          <div className="route-info__bottom" data-type="duration">{ getFormatedDuration(duration) }</div>
        </div>
        <div className="route__col">
          <div className="route-info__top" data-type="stops-count">{`${transfersCount} пересад${getSuffics(transfersCount)}`}</div>
          <div className="route-info__bottom" data-type="stops-list">
            { stops.join(", ") }
          </div>
        </div>
      </div>
  );
};

export default Route;
