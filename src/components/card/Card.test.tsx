import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

// Mock the stringUtils
vi.mock('../../utils/strings', () => ({
  stringUtils: {
    titleCase: (str: string) => str.toUpperCase(),
  },
}));

describe('Card component', () => {
  const mockHandleRepoId = vi.fn();

  it('renders title with stringUtils.titleCase applied', () => {
    render(
      <Card
        id={1}
        title="GoDaddy Assignments"
        description="Full Stack Developer"
        handleRepoId={mockHandleRepoId}
      />
    );

    expect(screen.getByText('GODADDY ASSIGNMENTS')).toBeInTheDocument();
  });

  it('renders description if provided', () => {
    render(
      <Card
        id={2}
        title="Github Repo"
        description="GoDaddy Github Repository"
        handleRepoId={mockHandleRepoId}
      />
    );

    const descElement = screen.getByText('GoDaddy Github Repository');
    expect(descElement).toBeInTheDocument();
    expect(descElement).toHaveClass('description');
  });

  it('renders fallback text and correct class when description is empty', () => {
    render(
      <Card
        id={3}
        title="Github Assignment"
        description=""
        handleRepoId={mockHandleRepoId}
      />
    );

    const fallbackText = screen.getByText('No description available.');
    expect(fallbackText).toBeInTheDocument();
    expect(fallbackText).toHaveClass('description', 'empty');
  });

  it('calls handleRepoId with id when card is clicked', () => {
    render(
      <Card
        id={42}
        title="click test"
        description="desc"
        handleRepoId={mockHandleRepoId}
      />
    );

    const card = screen.getByText('CLICK TEST').closest('.card');
    expect(card).not.toBeNull();

    if (card) {
      fireEvent.click(card);
      expect(mockHandleRepoId).toHaveBeenCalledTimes(1);
      expect(mockHandleRepoId).toHaveBeenCalledWith(42);
    }
  });

it('applies custom style if provided', () => {
  render(
    <Card
      id={5}
      title="Card styles"
      description="desc"
      handleRepoId={mockHandleRepoId}
      style={{ backgroundColor: 'rgb(255, 0, 0)' }}
    />
  );

  const card = screen.getByText('CARD STYLES').closest('.card');
  expect(card).not.toBeNull();
  if (card) {
    expect(card).toHaveStyle('background-color: rgb(255, 0, 0)');
  }
});


});
