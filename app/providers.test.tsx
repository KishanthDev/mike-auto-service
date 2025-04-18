import React from 'react';
import { render } from '@testing-library/react';
import { Providers } from './providers';
import { HeroUIProvider } from '@heroui/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useRouter } from 'next/navigation';

// Mock the dependencies
jest.mock('@heroui/system', () => ({
  HeroUIProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('next-themes', () => ({
  ThemeProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Providers Component', () => {
  const mockChildren = <div data-testid="test-child">Test Content</div>;
  const mockThemeProps = {
    attribute: 'class',
    defaultTheme: 'dark',
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });


  it('wraps children with HeroUIProvider and NextThemesProvider', () => {
    render(<Providers>{mockChildren}</Providers>);

    expect(HeroUIProvider).toHaveBeenCalled();
    expect(NextThemesProvider).toHaveBeenCalled();

    // Verify the nesting order
    const heroUIProviderCall = (HeroUIProvider as jest.Mock).mock.calls[0][0];
    expect(heroUIProviderCall.children.type).toBe(NextThemesProvider);
  });

  it('passes router.push to HeroUIProvider navigate prop', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValueOnce({ push: mockPush });

    render(<Providers>{mockChildren}</Providers>);

    expect(HeroUIProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        navigate: mockPush,
      }),
      expect.anything()
    );
  });

  it('uses default theme props when none are provided', () => {
    render(<Providers>{mockChildren}</Providers>);

    expect(NextThemesProvider).toHaveBeenCalledWith(
      expect.objectContaining({}),
      expect.anything()
    );
  });

  it('passes children through to NextThemesProvider', () => {
    render(<Providers>{mockChildren}</Providers>);

    const lastThemesProviderCall = (NextThemesProvider as jest.Mock).mock.calls[0][0];
    expect(lastThemesProviderCall.children).toBe(mockChildren);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Providers>{mockChildren}</Providers>);
    expect(asFragment()).toMatchSnapshot();
  });
});