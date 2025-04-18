// app/subcategory/layout.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import SidebarLayout from './layout';
import categoriesData from '../../data/detailed_categories_with_subcategories.json';

// Mock dependencies
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));
jest.mock('../../data/detailed_categories_with_subcategories.json', () => [
  {
    category: 'Electronics',
    subcategories: [{ name: 'Phones' }, { name: 'Laptops' }],
  },
  {
    category: 'Books',
    subcategories: [],
  },
]);

describe('SidebarLayout', () => {
  const mockUsePathname = usePathname as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/subcategory/electronics');
  });

  it('renders sidebar and main content', () => {
    render(<SidebarLayout><div>Main Content</div></SidebarLayout>);
    
    // Sidebar header
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toHaveClass('text-xl');
    
    // Categories
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Books')).toBeInTheDocument();
    
    // Main content
    expect(screen.getByText('Main Content')).toBeInTheDocument();
  });

  it('highlights active category', () => {
    render(<SidebarLayout><div>Main Content</div></SidebarLayout>);
    
    const electronicsLink = screen.getByText('Electronics').closest('div');
    expect(electronicsLink).toHaveClass('bg-blue-100');
    
    const booksLink = screen.getByText('Books').closest('div');
    expect(booksLink).not.toHaveClass('bg-blue-100');
  });

  it('handles keyboard navigation for toggle', async () => {
    render(<SidebarLayout><div>Main Content</div></SidebarLayout>);
    
    const electronicsButton = screen.getByText('Electronics').closest('div');
    
    // Press Enter
    fireEvent.keyDown(electronicsButton!, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByText('Phones')).toBeInTheDocument();
    });
    
    // Press Space
    fireEvent.keyDown(electronicsButton!, { key: ' ' });
    await waitFor(() => {
      expect(screen.queryByText('Phones')).not.toBeInTheDocument();
    });
  });

  it('highlights active subcategory', async () => {
    mockUsePathname.mockReturnValue('/subcategory/electronics/phones');
    render(<SidebarLayout><div>Main Content</div></SidebarLayout>);
    
    const electronicsButton = screen.getByText('Electronics').closest('div');
    fireEvent.click(electronicsButton!);
    
    await waitFor(() => {
      const phoneLink = screen.getByText('Phones');
      expect(phoneLink).toHaveClass('bg-blue-50');
      
      const laptopLink = screen.getByText('Laptops');
      expect(laptopLink).not.toHaveClass('bg-blue-50');
    });
  });

  it('renders categories without subcategories', () => {
    render(<SidebarLayout><div>Main Content</div></SidebarLayout>);
    
    const booksButton = screen.getByText('Books').closest('div');
    expect(booksButton).not.toHaveClass('bg-blue-100');
    expect(screen.queryByLabelText(/chevron/i)).not.toBeInTheDocument();
  });

  it('navigates to category and subcategory links', () => {
    render(<SidebarLayout><div>Main Content</div></SidebarLayout>);
    
    const electronicsLink = screen.getByText('Electronics').closest('a');
    expect(electronicsLink).toHaveAttribute('href', '/subcategory/electronics');
    
    fireEvent.click(screen.getByText('Electronics').closest('div')!);
    const phoneLink = screen.getByText('Phones');
    expect(phoneLink).toHaveAttribute('href', '/subcategory/electronics/phones');
  });

  it('stops propagation on link click', async () => {
    render(<SidebarLayout><div>Main Content</div></SidebarLayout>);
    
    const electronicsLink = screen.getByText('Electronics').closest('a');
    const toggleButton = screen.getByText('Electronics').closest('div');
    
    // Click link, ensure toggle doesn't open
    fireEvent.click(electronicsLink!);
    await waitFor(() => {
      expect(screen.queryByText('Phones')).not.toBeInTheDocument();
    });
  });
});