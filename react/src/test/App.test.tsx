import React from "react";
import { render, screen } from "@testing-library/react";
import App from "components/App";

test("renders start button", () => {
  render(<App />);
  const linkElement = screen.getByText(/start/i);
  expect(linkElement).toBeInTheDocument();
});
