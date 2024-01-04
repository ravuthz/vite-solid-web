import "@testing-library/jest-dom";
import { cleanup, fireEvent, render, screen } from "@solidjs/testing-library";
import { afterEach, describe, expect, it } from "vitest";

import App from "../src/App";

describe("App", () => {
  afterEach(cleanup);

  it("should render the app", () => {
    const { getByText } = render(() => <App />);
    expect(getByText("Vite + Solid")).toBeInTheDocument();
  });

  it("should render counter", () => {
    render(() => <App />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("count is 0");

    fireEvent.click(button);
    expect(button).toHaveTextContent("count is 1");

    fireEvent.click(button);
    expect(button).toHaveTextContent("count is 2");
  });
});
