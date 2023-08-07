// const React = require("react");
// const { render, screen, fireEvent } = require("@testing-library/react");
// const Login = require("@/components/Login/Login");

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '@/components/Login/Login';

describe("Login Component", () => {
  test("successful login", () => {
    const mockOnLogin = jest.fn();
    const mockOnLogout = jest.fn();
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
});
