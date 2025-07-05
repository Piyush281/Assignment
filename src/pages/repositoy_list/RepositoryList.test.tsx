import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MemoryRouter, Route, Routes, useLocation } from 'react-router';
import RepositoryList from './RepositoryList';

const Location = () => {
    const location = useLocation();
    return (
        <div data-testid="location-id">{location.pathname}</div>
    );
}

const mockRepositories = [
    {
        id: 1,
        name: 'Repo 1',
        description: 'Description 1',
        html_url: 'https://github.com/user/repo1',
        language: 'TypeScript',
        forks_count: 10,
        open_issues_count: 2,
        watchers_count: 5,
    },
    {
        id: 2,
        name: 'Repo 2',
        description: 'Description 2',
        html_url: 'https://github.com/user/repo2',
        language: 'JavaScript',
        forks_count: 8,
        open_issues_count: 1,
        watchers_count: 3,
    },
];

vi.mock('../../apis/repository_details', () => ({
    fetchRepositories: vi.fn(() => Promise.resolve(mockRepositories)),
}));

describe('RepositoryList Component', () => {

    it('renders the repository list page', async () => {
        render(
            <MemoryRouter initialEntries={['/repositories']}>
                <Routes>
                    <Route path="/repositories" element={<RepositoryList />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('GoDaddy Repository List')).toBeInTheDocument();
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            expect(screen.getByText('Total Repositories: 2')).toBeInTheDocument();
        });

    });

    it('Location Path', async () => {
        render(
            <MemoryRouter initialEntries={['/repositories']}>
                <Routes>
                    <Route path="/repositories" element={<RepositoryList />} />
                    <Route path="/" element={<div>Home Page</div>} />
                </Routes>
                <Location />
            </MemoryRouter>
        );
        expect(screen.getByTestId('location-id')).toHaveTextContent('/repositories');

        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
            const button = screen.getByRole('button', { name: 'Go Back to Home' });
            expect(button).toBeInTheDocument();
            fireEvent.click(button);
            expect(screen.getByTestId('location-id')).toHaveTextContent('/');
        });

    });

    it('renders repository cards', async () => {
        render(
            <MemoryRouter initialEntries={['/repositories']}>
                <Routes>
                    <Route path="/repositories" element={<RepositoryList />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Repo 1')).toBeInTheDocument();
            expect(screen.getByText('Repo 2')).toBeInTheDocument();
        });
    });

    it('handles repository selection', async () => {
        render(
            <MemoryRouter initialEntries={['/repositories']}>
                <Routes>
                    <Route path="/repositories" element={<RepositoryList />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            const repo1 = screen.getByText('Repo 1');
            const repo2 = screen.getByText('Repo 2');
            expect(repo1).toBeInTheDocument();
            expect(repo2).toBeInTheDocument();

            fireEvent.click(repo1);
            const repoContainer = screen.getByText('🔁 Forks:').closest('.container');
            expect(repoContainer).toBeInTheDocument();

            if (repoContainer) {
                const button = repoContainer.getElementsByClassName('go-back-button')[0];
                expect(button).toBeInTheDocument();
                fireEvent.click(button);
                expect(screen.queryByText('🔁 Forks:')).not.toBeInTheDocument();
            }

        });
    });
});