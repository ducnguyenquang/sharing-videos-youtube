import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Logged from "@/components/Logged/Logged";
import { mockNextUseRouter } from "@/utils/test_util";

describe("Logged Component", () => {
  test("successful logout", () => {
    const mockOnLogout = jest.fn();
    const mockOnShareAMovie = jest.fn();
    mockNextUseRouter({
      route: "/",
      pathname: "/",
      query: "",
      asPath: "/",
    });

    render(
      <Logged onLogout={mockOnLogout} onShareAMovie={mockOnShareAMovie} />
    );
    fireEvent.click(screen.getByText("Logout"));
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  test("Share a movie button", () => {
    const mockOnLogout = jest.fn();
    const mockOnShareAMovie = jest.fn();

    mockNextUseRouter({
      route: "/share",
      pathname: "/share",
      query: "",
      asPath: "/share",
    });

    render(
      <Logged onLogout={mockOnLogout} onShareAMovie={mockOnShareAMovie} />
    );
    fireEvent.click(screen.getByText("Share a movie"));
    expect(mockOnShareAMovie).toHaveBeenCalledTimes(1);
  });
});
