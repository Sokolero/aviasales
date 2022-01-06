import React, { useReducer, useContext } from "react";
import classNames from "classnames";
import { StateContext } from "./StateContext.js";

// ---- get classname for the state -----------------------------------------
const getClassName = (thisValue, activeFilter) => {
  return classNames({
    "price-filter__tab": true,
    "price-filter__tab--active": thisValue === activeFilter,
  });
}

// const createAction = () => {
//   const type = "changed_price_filter";
//   return {
//     chipest: {type, value: "chipest"},
//     fastes: {type, value: "fastest"},
//     normal: {type, value: "normal"},
//   };
// }

// ========= Component =========================================================
const PriceFilter = ({ activeFilter }) => {

  const dispatch = useContext(StateContext);

  function handleClick(e) {
    let name = e.target.dataset.name;
    dispatch({
      type: "changed_price_filter",
      payload: { price: name }
    });
  }

  return(
    <div className="price-filter">
      <div onClick={ handleClick } className={ getClassName("chipest", activeFilter) } data-name="chipest">Самый дешевый</div>
      <div onClick={ handleClick }  className={ getClassName("fastest", activeFilter) } data-name="fastest">Самый быстрый</div>
      <div onClick={ handleClick } className={ getClassName("normal", activeFilter) } data-name="normal">Оптимальный</div>
    </div>
  );
};

export default PriceFilter;
