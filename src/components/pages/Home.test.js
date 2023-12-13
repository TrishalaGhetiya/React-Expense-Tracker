import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders Activate Premium if button was not clicked', () => {
  render(<Home />);
  const buttonElement = screen.getByText("Activate Premium");
  expect(buttonElement).toBeInTheDocument();
});
