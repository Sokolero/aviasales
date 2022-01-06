import React, { useReducer, useEffect } from "react";
import axios from "axios";
import * as _ from "lodash";

import Logo from "./components/Logo.js";
import Ticket from "./components/Ticket.js";
import TicketList from "./components/TicketList.js";
import PriceFilter from "./components/PriceFilter.js";
import TransferFilter from "./components/TransferFilter.js";
import LoadBtn from "./components/LoadBtn.js"
import { StateContext } from "./components/StateContext.js";

import "./App.scss";

// useReducer
// useEffect


// ========== Getting the Data from server ===================================
const apiConf = {
  searchIdURL: "https://front-test.beta.aviasales.ru/search",
  ticketsURL: "https://front-test.beta.aviasales.ru/tickets",
};

const initialState = {
  searchId: null,
  tickets: [],
  isLoaded: false,
  filters: {
    price: "chipest", // fastest, normal
    stops: [
      "all"
    ] // "0", "1", "2", "3"
  },
};



// ------ REDUCER ------------------------------------------
const reducer = (state, action) => {
  switch (action.type) {
    case "app_has_mounted":
      return {
        ...state,
        searchId: action.payload.searchId,
        tickets: action.payload.tickets,
        isLoaded: !state.isLoaded
      };

    case "changed_price_filter":
      return {
        ...state,
        filters: {
          ...state.filters,
          price: action.payload.price,
        },
      };

    case "changed_stops_filter":
      return {
        ...state,
        filters: {
          ...state.filters,
          stops: state.filters.stops.includes(action.payload.filterName)
            ? _.without(state.filters.stops, action.payload.filterName)
            : _.concat(state.filters.stops, action.payload.filterName),
        },
      };

    default:
      return state;
  }
};

// ------- Action Creator ------------------------------------------------------
const createAction = async () => {
  const response = await axios.get(apiConf.searchIdURL);

  const tickets = await axios.get(apiConf.ticketsURL, {
    params: {
      searchId: response.data.searchId
    }
  });

  const payload = {
    searchId: response.data.searchId,
    tickets: tickets.data.tickets,
  };

  return payload;
};

// ---- filter set of tickets by stops count ----------------------------------
const filterByStops = (tickets, filters) => {
  if (filters.includes("all") || filters.length === 0) {
    return tickets;
  }
  return tickets.filter((ticket) => {
    let stopsCount = ticket.segments[0].stops.length + ticket.segments[1].stops.length;
    return filters.includes(String(stopsCount));
  });
};

// --- sort set of tickets by price category --------------------------------
const sortedByPrice = (tickets, priceCategory) => {
  const comparedFunctions = {
    chipest: (a, b) => a.price - b.price,
    fastest: (a, b) => (a.segments[0].duration + a.segments[1].duration) - (b.segments[0].duration + b.segments[1].duration),
    normal: (a, b) =>
      (a.segments[0].duration + a.segments[1].duration + a.price) - (b.segments[0].duration + b.segments[1].duration + b.price),
  }
  return tickets.sort(comparedFunctions[priceCategory]);
};



// ======== App Component =====================================================
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(async () => {
    if (!state.isLoaded) {
      const payload = await createAction();
      dispatch({ type: "app_has_mounted", payload });
    }
    return;
  });

// --- apply all sorts and filters for tickets ---------------------------------
  const _tickets = filterByStops(state.tickets, state.filters.stops);
  const __tickets = sortedByPrice(_tickets, state.filters.price);

// ------------------------------------------------------------
  return(
    <div className="wrapper">
      <div className="container">

        <StateContext.Provider value={ dispatch }>
          <Logo />
          <div className="grid-wrapper">
            <aside className="aside">
              <TransferFilter filters={ state.filters.stops }/>
            </aside>
            <main className="main">
              <PriceFilter activeFilter={ state.filters.price } />
              <TicketList tickets={ __tickets.slice(0, 6) } filters={ state.filters }/>
              <LoadBtn />
            </main>
          </div>
        </StateContext.Provider>

      </div>
    </div>
  )
}

export default App;
export { reducer, initialState };
