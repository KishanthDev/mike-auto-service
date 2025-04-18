import { render, screen } from "@testing-library/react";
import {
  Logo,
  DiscordIcon,
  TwitterIcon,
  GithubIcon,
  MoonFilledIcon,
  SunFilledIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons"; // Update the path as needed

describe("Icon components", () => {
  const icons = [
    { name: "Logo", Component: Logo },
    { name: "DiscordIcon", Component: DiscordIcon },
    { name: "TwitterIcon", Component: TwitterIcon },
    { name: "GithubIcon", Component: GithubIcon },
    { name: "MoonFilledIcon", Component: MoonFilledIcon },
    { name: "SunFilledIcon", Component: SunFilledIcon },
  ];

  icons.forEach(({ name, Component }) => {
    it(`${name} renders correctly with default size`, () => {
      const { container } = render(<Component />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("width");
      expect(svg).toHaveAttribute("height");
      expect(svg).toHaveAttribute("viewBox");
    });

    it(`${name} supports custom size`, () => {
      const { container } = render(<Component size={48} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("height", "48");
      expect(svg).toHaveAttribute("width", "48");
    });

    it(`${name} supports custom width and height`, () => {
      const { container } = render(<Component width={30} height={60} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "30");
      expect(svg).toHaveAttribute("height", "60");
    });

    it(`${name} supports additional props`, () => {
      const { container } = render(<Component data-testid="custom-icon" />);
      const icon = container.querySelector('[data-testid="custom-icon"]');
      expect(icon).toBeInTheDocument();
    });

    test('renders with default size', () => {
      render(<HeartFilledIcon />);
      const icon = screen.getByRole('presentation');
      expect(icon).toHaveAttribute('height', '24');
      expect(icon).toHaveAttribute('width', '24');
    });
    
    test('renders with custom size', () => {
      render(<HeartFilledIcon size={32} />);
      const icon = screen.getByRole('presentation');
      expect(icon).toHaveAttribute('height', '32');
      expect(icon).toHaveAttribute('width', '32');
    });
    
    test('renders with custom width and height', () => {
      render(<HeartFilledIcon width={40} height={40} />);
      const icon = screen.getByRole('presentation');
      expect(icon).toHaveAttribute('height', '40');
      expect(icon).toHaveAttribute('width', '40');
    });
    
    test('renders SearchIcon with default size', () => {
      render(<SearchIcon />);
      const icon = screen.getByRole('presentation');
      expect(icon).toHaveAttribute('height', '24');
      expect(icon).toHaveAttribute('width', '24');

    });
    

  });
});
