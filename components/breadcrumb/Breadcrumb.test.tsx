import React from 'react';
import { render, screen } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';
import { Category, Subcategory } from '@/types/category';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Breadcrumb Component', () => {
  const mockCategory: Category = {
    category: 'Electronics',
    subcategories: [
      {
        name: 'Laptops',
        businesses: []
      }
    ]
  };

  const mockSubcategory: Subcategory = {
    name: 'Laptops',
    businesses: []
  };

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  it('renders basic breadcrumb with Home and Categories when no category provided', () => {
    render(<Breadcrumb />);
    
    expect(screen.getByText('🏡 Home')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByTestId('layout-list-icon')).toBeInTheDocument();
    expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
  });

  it('renders category link when category is provided', () => {
    (usePathname as jest.Mock).mockReturnValue('/category');
    render(<Breadcrumb category={mockCategory} />);
    
    expect(screen.getByText('🏡 Home')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Electronics').closest('a')).toHaveAttribute('href', '/subcategory/electronics');
  });

  it('renders category as current page when on category page', () => {
    (usePathname as jest.Mock).mockReturnValue('/subcategory/electronics');
    render(<Breadcrumb category={mockCategory} />);
    
    const categoryElement = screen.getByText('Electronics');
    expect(categoryElement.closest('a')).toBeNull(); // Not a link
    expect(categoryElement).toHaveAttribute('aria-current', 'page');
  });

  it('renders subcategory when provided', () => {
    render(<Breadcrumb category={mockCategory} subcategory={mockSubcategory} />);
    
    expect(screen.getByText('Laptops')).toBeInTheDocument();
    expect(screen.getByText('Laptops').closest('a')).toBeNull(); // Subcategory is not a link
  });

  it('renders correct dark mode classes', () => {
    render(<Breadcrumb category={mockCategory} subcategory={mockSubcategory} />);
    
    const homeLink = screen.getByText('🏡 Home');
    expect(homeLink).toHaveClass('dark:text-blue-400');
    
    const categoriesLink = screen.getByText('Categories');
    expect(categoriesLink).toHaveClass('dark:text-blue-400');
    
    const subcategoryText = screen.getByText('Laptops');
    expect(subcategoryText).toHaveClass('dark:text-white');
  });
});