import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeSwitch } from "@/components/theme-switch";

// Mocks
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

jest.mock("@react-aria/ssr", () => ({
  useIsSSR: jest.fn(),
}));

jest.mock("@heroui/switch", () => {
  const React = require("react");
  return {
    useSwitch: ({ isSelected, onChange }: any) => {
      const Component = ({ children, ...props }: any) => (
        <div {...props} onClick={onChange}>
          {children}
        </div>
      );
      return {
        Component,
        slots: {
          wrapper: ({ class: className }: any) => ({ className }),
        },
        isSelected,
        getBaseProps: (props: any) => props,
        getInputProps: () => ({}),
        getWrapperProps: () => ({}),
      };
    },
  };
});

describe("ThemeSwitch", () => {
  const mockSetTheme = jest.fn();
  const useThemeMock = require("next-themes").useTheme;
  const useIsSSRMock = require("@react-aria/ssr").useIsSSR;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders MoonFilledIcon when theme is light", () => {
    useThemeMock.mockReturnValue({ theme: "light", setTheme: mockSetTheme });
    useIsSSRMock.mockReturnValue(false);

    const { container } = render(<ThemeSwitch />);
    expect(container.querySelector("svg")).toBeInTheDocument(); // Moon icon
  });

  it("renders SunFilledIcon when isSSR is true", () => {
    useThemeMock.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    useIsSSRMock.mockReturnValue(true);

    const { container } = render(<ThemeSwitch />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("toggles theme on click (light to dark)", () => {
    useThemeMock.mockReturnValue({ theme: "light", setTheme: mockSetTheme });
    useIsSSRMock.mockReturnValue(false);

    const { container } = render(<ThemeSwitch />);
    fireEvent.click(container.firstChild!);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("toggles theme on click (dark to light)", () => {
    useThemeMock.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    useIsSSRMock.mockReturnValue(false);

    const { container } = render(<ThemeSwitch />);
    fireEvent.click(container.firstChild!);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });  
});
