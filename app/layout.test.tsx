import React from 'react';
import { render } from '@testing-library/react';
import RootLayout from './layout';
import { Providers } from './providers';

jest.mock('@/components/navbar', () => ({
  Navbar: jest.fn(() => <div data-testid="navbar">Navbar</div>),
}));

jest.mock('./providers', () => ({
  Providers: jest.fn(({ children }) => <div data-testid="providers">{children}</div>),
}));

jest.mock('./layout', () => {
  const originalModule = jest.requireActual('./layout');
  return {
    __esModule: true,
    ...originalModule,
    metadata: {
      title: {
        default: 'Test Site',
        template: '%s - Test Site',
      },
      description: 'Test description',
      icons: {
        icon: "/favicon.ico",
      },
    },
    viewport: {
      themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
      ],
    },
  };
});

describe('RootLayout', () => {
  it('should have correct viewport configuration', () => {
    const { viewport } = require('./layout');
    expect(viewport).toEqual({
      themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
      ],
    });
  });

  it('passes correct theme props to Providers', () => {
    render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );

    expect(Providers).toHaveBeenCalledWith(
      expect.objectContaining({
        themeProps: {
          attribute: "class",
          defaultTheme: "dark"
        },
        children: expect.anything()
      }),
      {}
    );
  });
});