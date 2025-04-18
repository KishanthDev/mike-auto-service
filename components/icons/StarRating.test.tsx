import React from 'react';
import { render, screen } from '@testing-library/react';
import StarRating from './StarRating';

jest.mock('lucide-react', () => ({
  Star: jest.fn((props) => <svg data-testid="star" {...props} />),
  StarHalf: jest.fn((props) => <svg data-testid="star-half" {...props} />),
}));

describe('StarRating Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct number of stars for integer ratings', () => {
    render(<StarRating rating={3} />);
    
    const stars = screen.getAllByTestId('star');
    expect(stars).toHaveLength(5); // 5 total stars (filled + empty)
    
    stars.slice(0, 3).forEach(star => {
      expect(star).toHaveClass('fill-yellow-500');
    });
    
    stars.slice(3).forEach(star => {
      expect(star).not.toHaveClass('fill-yellow-500');
    });
    
    expect(screen.queryByTestId('star-half')).not.toBeInTheDocument();
    
    expect(screen.getByText('3.0')).toBeInTheDocument();
  });

  it('renders half star for .5 ratings', () => {
    render(<StarRating rating={3.5} />);
    
    const fullStars = screen.getAllByTestId('star')
      .filter(star => star.classList.contains('fill-yellow-500'));
    expect(fullStars).toHaveLength(3);
    
    const halfStar = screen.getByTestId('star-half');
    expect(halfStar).toBeInTheDocument();
    expect(halfStar).toHaveClass('fill-yellow-500');
    
    const emptyStars = screen.getAllByTestId('star')
      .filter(star => !star.classList.contains('fill-yellow-500'));
    expect(emptyStars).toHaveLength(1);
    
    // Check rating number
    expect(screen.getByText('3.5')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<StarRating rating={2.5} />);
    
    const stars = screen.getAllByTestId('star');
    stars.slice(0, 2).forEach(star => {
      expect(star).toHaveClass('fill-yellow-500');
      expect(star).toHaveClass('text-yellow-500');
    });
    
    stars.slice(3).forEach(star => {
      expect(star).toHaveClass('text-yellow-500');
      expect(star).not.toHaveClass('fill-yellow-500');
    });
    
    const halfStar = screen.getByTestId('star-half');
    expect(halfStar).toHaveClass('fill-yellow-500');
    expect(halfStar).toHaveClass('text-yellow-500');
    
    const ratingText = screen.getByText('2.5');
    expect(ratingText).toHaveClass('text-gray-800');
    expect(ratingText).toHaveClass('dark:text-gray-300');
  });

  it('matches snapshot for various ratings', () => {
    const { asFragment: fragment1 } = render(<StarRating rating={0} />);
    expect(fragment1()).toMatchSnapshot();
    
    const { asFragment: fragment2 } = render(<StarRating rating={3.5} />);
    expect(fragment2()).toMatchSnapshot();
    
    const { asFragment: fragment3 } = render(<StarRating rating={5} />);
    expect(fragment3()).toMatchSnapshot();
  });
});