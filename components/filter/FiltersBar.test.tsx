import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FiltersBar } from './FiltersBar';

// Mock the Lucide icon
jest.mock('lucide-react', () => ({
  Filter: jest.fn(() => <svg data-testid="filter-icon" />),
}));

describe('FiltersBar Component', () => {
  const filterOptions = [
    'Open Now',
    'Top Rated',
    'Within 2 miles',
    'Free Estimates',
    'Price: $$$',
  ];

  it('renders the filters bar with all options', () => {
    render(<FiltersBar />);
    
    // Check for the header section with icon
    expect(screen.getByText('Filters:')).toBeInTheDocument();
    expect(screen.getByTestId('filter-icon')).toBeInTheDocument();
    
    // Check all filter options are rendered
    filterOptions.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('applies inactive styles to filters by default', () => {
    render(<FiltersBar />);
    
    filterOptions.forEach(option => {
      const button = screen.getByText(option);
      expect(button).toHaveClass('bg-white');
      expect(button).toHaveClass('text-gray-800');
      expect(button).toHaveClass('dark:bg-gray-800');
      expect(button).toHaveClass('dark:text-gray-200');
    });
  });

  it('toggles filter active state when clicked', () => {
    render(<FiltersBar />);
    const firstFilter = screen.getByText('Open Now');
    
    // Click to activate
    fireEvent.click(firstFilter);
    expect(firstFilter).toHaveClass('bg-blue-500');
    expect(firstFilter).toHaveClass('text-white');
    
    // Click to deactivate
    fireEvent.click(firstFilter);
    expect(firstFilter).toHaveClass('bg-white');
    expect(firstFilter).toHaveClass('text-gray-800');
  });

  it('maintains multiple active filters', () => {
    render(<FiltersBar />);
    const firstFilter = screen.getByText('Open Now');
    const secondFilter = screen.getByText('Top Rated');
    
    // Activate both filters
    fireEvent.click(firstFilter);
    fireEvent.click(secondFilter);
    
    expect(firstFilter).toHaveClass('bg-blue-500');
    expect(secondFilter).toHaveClass('bg-blue-500');
    
    // Check that other filters remain inactive
    const thirdFilter = screen.getByText('Within 2 miles');
    expect(thirdFilter).toHaveClass('bg-white');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<FiltersBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});