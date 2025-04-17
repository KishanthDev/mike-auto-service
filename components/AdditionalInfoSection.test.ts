import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdditionalInfoSection from './AdditionalInfoSection';

describe('AdditionalInfoSection', () => {
  it('renders the section with correct heading', () => {
    render(React.createElement(AdditionalInfoSection));
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Additional Information');
    expect(heading).toHaveClass('text-2xl', 'md:text-3xl', 'font-bold', 'border-b-2', 'border-red-600', 'pb-2', 'text-[#1a3c6e]', 'dark:text-white');
  });

  it('renders all information items correctly', () => {
    render(React.createElement(AdditionalInfoSection));
    
    const items = [
      { label: 'Makes Serviced:', text: 'All domestic and foreign vehicles' },
      { label: 'Warranty:', text: '24-month / 24,000 mile warranty on parts and labor' },
      { label: 'Shuttle Service:', text: 'Available within 5 miles' },
      { label: 'Loaner Cars:', text: 'Available for major repairs (reservation required)' },
      { label: 'Languages:', text: 'English, Spanish' },
    ];

    items.forEach(item => {
      const labelElement = screen.getByText(item.label);
      expect(labelElement).toBeInTheDocument();
      expect(labelElement.tagName).toBe('STRONG');
      
      const parentParagraph = labelElement.parentElement;
      expect(parentParagraph).toHaveTextContent(item.text);
    });
  });

  it('matches snapshot', () => {
    const { asFragment } = render(React.createElement(AdditionalInfoSection));

    expect(asFragment()).toMatchSnapshot();
  });
});