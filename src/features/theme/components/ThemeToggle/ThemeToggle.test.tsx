import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { useThemeStore } from '../../hooks/useThemeStore';
import { ThemeToggle } from './ThemeToggle';

const mockToggleTheme = vi.fn();

vi.mock('../../hooks/useThemeStore', () => ({
  useThemeStore: vi.fn(),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with light mode initially', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    render(<ThemeToggle />);
    expect(screen.getByText('🌙')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('toggles to dark mode on click', async () => {
    vi.mocked(useThemeStore).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('has correct aria-label', () => {
    vi.mocked(useThemeStore).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });
});