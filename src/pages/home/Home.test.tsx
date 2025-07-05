import {describe, it, expect} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';   
import { MemoryRouter, Route, Routes, useLocation } from 'react-router';

import Home from './Home';

// vi.mock('react-router', () => ({
//     Link: ({ children }) => <div>{children}</div>,
// }));

const Location = () => {
    const location = useLocation();
    return (
        <div data-testid="location-id">{location.pathname}</div>
    );
}

describe('Home Component', () => {
    it('renders the home page with a title and button', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('GoDaddy Assignment');
        const button = screen.getByRole('button', { name: 'Go to Repositories' });
        expect(button).toBeInTheDocument();

        const routeLink = button.closest('a');
        expect(routeLink).toBeInTheDocument();
        expect(routeLink).toHaveAttribute('href', '/repositories');

    });

    it('navigates to repositories page when button is clicked', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/repositories" element={<div>Repositories Page</div>} />
                </Routes>
                <Location />
            </MemoryRouter>
        );

        expect(screen.getByTestId('location-id')).toHaveTextContent('/');

        const button = screen.getByRole('button', { name: 'Go to Repositories' });
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(screen.getByTestId('location-id')).toHaveTextContent('/repositories');
    });
});