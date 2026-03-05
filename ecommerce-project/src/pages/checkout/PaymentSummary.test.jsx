import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { PaymentSummary } from "./PaymentSummary";

vi.mock("axios");

describe("PaymentSummary component", () => {
  let user;
  let loadCart;
  let paymentSummary;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 0,
      productCostCents: 0,
      shippingCostCents: 0,
      totalCostBeforeTaxCents: 0,
      taxCents: 0,
      totalCostCents: 0,
    };
    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it("checks the dollar amount correctly", () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("payment1")).toHaveTextContent("$");

    expect(screen.getByTestId("payment2")).toHaveTextContent("$");

    expect(screen.getByTestId("payment3")).toHaveTextContent("$");

    expect(screen.getByTestId("payment4")).toHaveTextContent("$");

    expect(screen.getByTestId("payment5")).toHaveTextContent("$");
  });

  it("places an order", async () => {
    function Location() {
      const location = useLocation();
      return <div data-testid="url-path">{location.pathname}</div>;
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>,
    );
    const placeOrderButton = screen.getByTestId("place-order-button");
    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith("/api/orders");
    expect(loadCart).toHaveBeenCalled();
    expect(screen.getByTestId("url-path")).toHaveTextContent("/orders");
  });
});
