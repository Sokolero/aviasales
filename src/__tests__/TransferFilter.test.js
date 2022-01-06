import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";

import TransferFilter from "../components/TransferFilter.js";

// --- Prepare container for tested component ----------------------------------
let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

// --- Clear container for tested component ------------------------------------
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


// --- Tests -------------------------------------------------------------------
test("transferFilter rendering", () => {
  let checkboxes = container.querySelectorAll(".transfer-filter__item input");
  let filters = null;

  // --- case ---------
  filters = ["all"];
  act(() => {
    render(<TransferFilter filters={ filters } />, container)
  });

  for (checkbox of checkboxes) {
    if (filters.includes(checkbox.dataset.name)) {
      expect(checkbox.checked).toBeTruthy;
    }
    expect(checkbox.checked).toBeFalsy;
  }

  // --- case ---------
  filters = ["0", "1", "2", "3"];
  act(() => {
    render(<TransferFilter filters={ filters } />, container)
  });

  for (checkbox of checkboxes) {
    if (filters.includes(checkbox.dataset.name)) {
      expect(checkbox.checked).toBeTruthy;
    }
    expect(checkbox.checked).toBeFalsy;
  }

  // --- case ---------
  filters = undefined;
  act(() => {
    render(<TransferFilter filters={ filters } />, container)
  });

  for (checkbox of checkboxes) {
    if (checkbox.dataset.name === "all") {
      expect(checkbox.checked).toBeTruthy;
    }
    expect(checkbox.checked).toBeFalsy;
  }

});
