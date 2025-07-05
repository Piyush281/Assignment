import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Repository from './Repository';

vi.mock('../../utils/strings', () => ({
    stringUtils: {
        titleCase: (str: string) => str.toUpperCase(),
    },
}));

describe('Repository Component', () => {
    const mockGoBack = vi.fn();
    const mockDetails = {
        id: 1,
        name: 'GoDaddy Assignments',
        description: 'Full Stack Developer',
        html_url: 'https://google.com',
        language: 'TypeScript',
        forks_count: 10,
        open_issues_count: 5,
        watchers_count: 20,
    };

    it('renders repository details with title case', () => {
        render(
            <Repository
                details={mockDetails}
                goBack={mockGoBack}
                styles={{}}
            />
        );

        expect(screen.getByText('GODADDY ASSIGNMENTS')).toBeInTheDocument();
        expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();

        const forksElement = screen.getByText('🔁 Forks:').closest('p');
        expect(forksElement).toHaveTextContent('10');

        const openIssuesElement = screen.getByText('🔓 Open Issues:').closest('p');
        expect(openIssuesElement).toHaveTextContent('5');

        const languageElement = screen.getByText('💻 Language:').closest('p');
        expect(languageElement).toHaveTextContent('TypeScript');

        const watchersElement = screen.getByText('👁️ Watchers:').closest('p');
        expect(watchersElement).toHaveTextContent('20');

        const repoUrlElement = screen.getByText('🔗 Repository URL:').closest('a');
        if (repoUrlElement) {
            expect(repoUrlElement).toHaveAttribute('href', 'https://google.com');
        }
    });

    it('calls goBack when the button is clicked', () => {
        render(
            <Repository
                details={mockDetails}
                goBack={mockGoBack}
                styles={{}}
            />
        );

        const goBackButton = screen.getByText('Go Back');
        fireEvent.click(goBackButton);

        expect(mockGoBack).toHaveBeenCalledWith(-1);
    });

    it('applies custom styles if provided', () => {
        const customStyles = { backgroundColor: 'rgb(255, 0, 0)' };
        render(
            <Repository
                details={mockDetails}
                goBack={mockGoBack}
                styles={customStyles}
            />
        );

        const container = screen.getByText('GODADDY ASSIGNMENTS').closest('.container');
        expect(container).toHaveStyle('background-color: rgb(255, 0, 0)');
    });

});
