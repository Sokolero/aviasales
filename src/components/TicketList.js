import React from "react";
import * as _ from "lodash";

import Ticket from "./Ticket.js";



// ------ TicketList Component ------------------------------------------------
const TicketList = ({ tickets, filters }) => {
  return(
    <>
      {
        tickets.map(
          (ticket, index) =>
            <Ticket
              price={ticket.price}
              segments={ticket.segments}
              carrier={ticket.carrier}
              key={index} />
        )
      }
    </>
  );
};

export default TicketList;
