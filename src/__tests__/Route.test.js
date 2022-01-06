import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Route from "../components/Route.js";
import { getFormatedDuration, getFlightInterval } from "../components/Route.js";

// 2011-10-05T14:48:00.000Z - iso format of the date

// ======= Test util functions ========================
test('check the format of the flight duration', () => {
  expect(getFormatedDuration(1000)).toBe("16ч 40м");
  expect(getFormatedDuration(960)).toBe("16ч 00м");
});

// -----------------------------------------------------------------------------
test('check the format of the departure / destination time', () => {
  expect(getFlightInterval("2022-01-14T14:48:00.000Z", 1500)).toBe("14:48 - 15:48");
  expect(getFlightInterval("2022-02-27T10:25:00.000Z", 245)).toBe("10:25 - 14:30");
});



// ======= Test Component ===================================================
const testSegments = [
  {
    origin: "HKT",
    destination: "MOW",
    date: "2011-10-05T14:48:00.000Z",
    stops: ["PKG", "PKN"],
    duration: 460
  },
  {
    origin: "MOW",
    destination: "HKT",
    date: "2011-10-20T10:20:00.000Z",
    stops: ["PKG"],
    duration: 320
  },
  {
    origin: "MOW",
    destination: "HKT",
    date: "2011-10-11T10:29:00.000Z",
    stops: [],
    duration: 1000
  }
]

// --- Prepare test ------------------------
let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// --- tests ------------------------------------------------------------------
test("check rendering of the component by props", () => {
  // ---------------------------------------------------
  act(() => {
    render(<Route route={ testSegments[0] }/>, container);
  });

  expect(container.querySelector("div[data-type=orig-dest]").textContent)
    .toBe("HKT - MOW");
  expect(container.querySelector("div[data-type=flight-int]").textContent)
    .toBe("14:48 - 22:28");
  expect(container.querySelector("div[data-type=duration]").textContent)
    .toBe("07ч 40м");
  expect(container.querySelector("div[data-type=stops-count]").textContent)
    .toBe("2 пересадки");
  expect(container.querySelector("div[data-type=stops-list]").textContent)
    .toBe("PKG, PKN");

  // ---------------------------------------------------
    act(() => {
      render(<Route route={ testSegments[1] }/>, container);
    });

    expect(container.querySelector("div[data-type=orig-dest]").textContent)
      .toBe("MOW - HKT");
    expect(container.querySelector("div[data-type=flight-int]").textContent)
      .toBe("10:20 - 15:40");
    expect(container.querySelector("div[data-type=duration]").textContent)
      .toBe("05ч 20м");
    expect(container.querySelector("div[data-type=stops-count]").textContent)
      .toBe("1 пересадка");
    expect(container.querySelector("div[data-type=stops-list]").textContent)
      .toBe("PKG");

  // ------------------------------------------------------------------
    act(() => {
      render(<Route route={ testSegments[2] }/>, container);
    });

    expect(container.querySelector("div[data-type=orig-dest]").textContent)
      .toBe("MOW - HKT");
    expect(container.querySelector("div[data-type=flight-int]").textContent)
      .toBe("10:29 - 03:09");
    expect(container.querySelector("div[data-type=duration]").textContent)
      .toBe("16ч 40м");
    expect(container.querySelector("div[data-type=stops-count]").textContent)
      .toBe("0 пересадок");
    expect(container.querySelector("div[data-type=stops-list]").textContent)
      .toBe("");
});
