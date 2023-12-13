import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    test('renders user details if request succeeds', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: 'p1', title: 'first post'}]
        }); 
        render(<Header />);
        const logoutElement = await screen.findAllByRole("Logout");
        expect(logoutElement).not.toHaveLength(0);
      });
})

