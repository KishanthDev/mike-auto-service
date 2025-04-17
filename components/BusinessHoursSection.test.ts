import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BusinessHoursSection from './BusinessHoursSection';
import type { BusinessHour } from '@/types/data';

describe('BusinessHoursSection', () => {
  const mockBusinessHours: BusinessHour[] = [
    { day: 'Monday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '8:00 AM - 8:00 PM' },
    { day: 'Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  it('renders the section with correct heading', () => {
    render(React.createElement(BusinessHoursSection, { businessHours: mockBusinessHours }));
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Business Hours');
    expect(heading).toHaveClass('text-2xl', 'md:text-3xl', 'font-bold', 'border-b-2', 'border-red-600', 'pb-2', 'text-[#1a3c6e]', 'dark:text-white');
  });

  it('renders the emergency towing notice', () => {
    render(React.createElement(BusinessHoursSection, { businessHours: mockBusinessHours }));
    
    const notice = screen.getByText('24/7 Emergency Towing Available');
    expect(notice).toBeInTheDocument();
    expect(notice).toHaveClass('mt-3', 'font-semibold', 'text-red-600', 'dark:text-red-400');
  });

  it('handles empty business hours array', () => {
    render(React.createElement(BusinessHoursSection, { businessHours: [] }));
    
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('24/7 Emergency Towing Available')).toBeInTheDocument();
    
    mockBusinessHours.forEach(day => {
      expect(screen.queryByText(day.day)).not.toBeInTheDocument();
      expect(screen.queryByText(day.hours)).not.toBeInTheDocument();
    });
  });

  it('matches snapshot with data', () => {
    const { asFragment } = render(
      React.createElement(BusinessHoursSection, { businessHours: mockBusinessHours })
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with empty data', () => {
    const { asFragment } = render(
      React.createElement(BusinessHoursSection, { businessHours: [] })
    );
    expect(asFragment()).toMatchSnapshot();
  });
});