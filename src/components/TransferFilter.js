import React, { useContext } from "react";

import { StateContext } from "./StateContext.js";



// ========= Component =========================================================
const TransferFilter = (props) => {

  const dispatch = useContext(StateContext);

  const filters = props.filters || ["all"];

  function handleChange(e) {
    let name = e.target.dataset.name;
    dispatch({ type: "changed_stops_filter",  payload: { filterName: name }});
  }

  return(
    <div className="transfer-filter">
      <div className="transfer-filter__title">Количество пересадок</div>

      <label className="transfer-filter__item">
        <input onChange={handleChange} checked={ filters.includes("all") } type="checkbox" data-name="all"/>
        <span >Все</span>
      </label>

      <label className="transfer-filter__item">
        <input onChange={handleChange} checked={ filters.includes("0") } type="checkbox" data-name="0"/>
        <span >Без пересадок</span>
      </label>

      <label className="transfer-filter__item">
        <input onChange={handleChange} checked={ filters.includes("1") } type="checkbox" data-name="1"/>
        <span >1 пересадка</span>
      </label>

      <label className="transfer-filter__item">
        <input onChange={handleChange} checked={ filters.includes("2") } type="checkbox" data-name="2"/>
        <span >2 пересадки</span>
      </label>

      <label className="transfer-filter__item">
        <input onChange={handleChange} checked={ filters.includes("3") } type="checkbox" data-name="3"/>
        <span >3 пересадки</span>
      </label>

    </div>
  )
};

export default TransferFilter;
