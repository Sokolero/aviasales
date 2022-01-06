import React from "react";
import PropTypes from "prop-types";

import Route from "./Route.js";


// ========= Component =========================================================
const Ticket = ({ price, segments, carrier }) => {
  const forward = segments[0];
  const back = segments[1];

  let formatedPrice = Intl.NumberFormat('ru-RU').format(price);
  let companyLogoUrl = `http://pics.avs.io/99/36/${carrier}.png`;

  return (
    <div className="ticket">
      <div className="ticket__header">
        <div className="ticket__price">{ formatedPrice } P</div>
        <img src={ companyLogoUrl } alt="flight-company-brend-logo" className="brend-logo"/>
      </div>
      <div className="ticket__body">
        <Route route={ forward } />
        { back ? <Route route={ back } /> : null }
      </div>
    </div>
  );
};

export default Ticket;
