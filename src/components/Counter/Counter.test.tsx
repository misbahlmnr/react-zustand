import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from ".";

const mockIncrement = vi.fn();
const mockDecrement = vi.fn();

vi.mock("@/services/state/countStore", () => ({
  default: () => ({
    count: 0,
    increment: mockIncrement,
    decrement: mockDecrement,
  }),
}));

describe("Counter test", () => {
  it("should render correctly initial value", async () => {
    render(<Counter />);

    const counterText = screen.getByText("0");
    expect(counterText).toBeInTheDocument();
  });

  it("should render correctly increment value", async () => {
    render(<Counter />);

    const incrementButton = screen.getByText("+");
    expect(incrementButton).toBeInTheDocument();
    fireEvent.click(incrementButton);
    expect(mockIncrement).toHaveBeenCalledTimes(1);
  });

  it("should render correctly decrement value", async () => {
    render(<Counter />);

    const decrementButton = screen.getByText("-");
    expect(decrementButton).toBeInTheDocument();
    fireEvent.click(decrementButton);
    expect(mockDecrement).toHaveBeenCalledTimes(1);
  });
});
