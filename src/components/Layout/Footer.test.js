import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders learn react link', () => {
  render(<Footer />);
  const linkElement = screen.getByText("Expense Tracker | Copyright 2023 | All Rights Reserved");
  expect(linkElement).toBeInTheDocument();
});
