// footer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer'; // Adjust the import path as needed

describe('Footer Component', () => {
  beforeEach(() => {
    render(React.createElement(Footer));
  });

  it('renders without crashing', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('has the correct background colors', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-[#1a3c6e]');
    expect(footer).toHaveClass('dark:bg-gray-900');
  });

  it('displays the correct copyright text', () => {
    expect(
      screen.getByText(/© 2025 Mike's Auto Service - All Rights Reserved/i)
    ).toBeInTheDocument();
  });

  it('shows the payment methods heading', () => {
    expect(screen.getByText('We accept:')).toBeInTheDocument();
  });

  describe('Payment Method Icons', () => {
    const cards = ['V', 'M', 'A'];

    it('renders all payment method icons', () => {
      cards.forEach((card) => {
        expect(screen.getByText(card)).toBeInTheDocument();
      });
    });

    it('has correct styling for payment icons', () => {
      const icons = screen.getAllByTestId('payment-icon');
      expect(icons).toHaveLength(3);
      
      icons.forEach((icon) => {
        expect(icon).toHaveClass('bg-white');
        expect(icon).toHaveClass('dark:bg-gray-200');
        expect(icon).toHaveClass('rounded');
      });
    });

    it('has correct responsive sizing', () => {
      const icons = screen.getAllByTestId('payment-icon');
      icons.forEach((icon) => {
        expect(icon).toHaveClass('w-8');
        expect(icon).toHaveClass('h-8');
        expect(icon).toHaveClass('md:w-10');
        expect(icon).toHaveClass('md:h-10');
      });
    });
  });

  it('has correct spacing classes', () => {
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('p-6');
    expect(footer).toHaveClass('mt-8');
    expect(footer).toHaveClass('md:mt-12');
  });

  it('has correct text styling', () => {
    const textElements = screen.getAllByRole('paragraph');
    textElements.forEach((el) => {
      expect(el).toHaveClass('text-sm');
      expect(el).toHaveClass('md:text-base');
    });
  });
});