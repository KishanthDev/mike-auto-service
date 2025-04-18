import React from "react";
import { render } from "@testing-library/react";
import {
  Logo,
  DiscordIcon,
  TwitterIcon,
  GithubIcon,
  MoonFilledIcon,
  SunFilledIcon,
} from "@/components/icons";

describe("SVG Icon Components", () => {
  it("renders Logo", () => {
    const { container } = render(<Logo size={40} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders DiscordIcon", () => {
    const { container } = render(<DiscordIcon size={30} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders TwitterIcon", () => {
    const { container } = render(<TwitterIcon size={30} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders GithubIcon", () => {
    const { container } = render(<GithubIcon size={30} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders MoonFilledIcon", () => {
    const { container } = render(<MoonFilledIcon size={30} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders SunFilledIcon", () => {
    const { container } = render(<SunFilledIcon size={30} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
