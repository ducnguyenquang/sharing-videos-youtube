import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Logged from "@/components/Logged/Logged";
import { mockNextUseRouter } from "@/utils/test_util";
import SharedMovieInputForm from "@/components/SharedMovieInputForm/SharedMovieInputForm";

describe("SharedMovieInputForm Component", () => {
  test("successful share", () => {
    const mockOnSharedMovie = jest.fn();

    mockNextUseRouter({
      route: "/",
      pathname: "/",
      query: "",
      asPath: "/",
    });

    render(<SharedMovieInputForm onSharedMovie={mockOnSharedMovie} />);
    fireEvent.change(screen.getByLabelText("Youtube URL:"), {
      target: { value: "https://www.youtube.com/watch?v=rw4s4M3hFfs" },
    });
    fireEvent.click(screen.getByText("Share"));
    expect(mockOnSharedMovie).toHaveBeenCalledTimes(1);
  });

  test("fail share", () => {
    const mockOnSharedMovie = jest.fn();

    mockNextUseRouter({
      route: "/share",
      pathname: "/share",
      query: "",
      asPath: "/share",
    });

    render(<SharedMovieInputForm onSharedMovie={mockOnSharedMovie} />);
    fireEvent.change(screen.getByLabelText("Youtube URL:"), {
      target: { value: "abc" },
    });
    fireEvent.click(screen.getByText("Share"));
    expect(mockOnSharedMovie).not.toHaveBeenCalled();
    expect(screen.getByText("Enter correct url!")).toBeInTheDocument();
  });
});
