import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "@/components/Login/Login";
import { mockNextUseRouter } from "@/utils/test_util";

describe("Login Component", () => {
  test("successful login", () => {
    const mockOnLogin = jest.fn();
    const mockOnLogout = jest.fn();

    mockNextUseRouter({
      route: "/",
      pathname: "/",
      query: "",
      asPath: "/",
    });

    render(<Login onLogin={mockOnLogin} onLogout={mockOnLogout} />);

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByText("Login / Register"));

    expect(mockOnLogin).toHaveBeenCalledTimes(1);
    expect(mockOnLogin).toHaveBeenCalledWith("testuser");
  });

  test("failed login", () => {
    const mockOnLogin = jest.fn();
    const mockOnLogout = jest.fn();

    render(<Login onLogin={mockOnLogin} onLogout={mockOnLogout} />);

    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Login / Register"));

    expect(mockOnLogin).not.toHaveBeenCalled();
    expect(
      screen.getByText("Invalid username or password")
    ).toBeInTheDocument();
  });

  test("input fields update", () => {
    render(<Login onLogin={() => {}} onLogout={() => {}} />);

    const usernameInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });

    expect((usernameInput as HTMLInputElement).value).toBe("testuser");
    expect((passwordInput as HTMLInputElement).value).toBe("testpassword");
  });
});
