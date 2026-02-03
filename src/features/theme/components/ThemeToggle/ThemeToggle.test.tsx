import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useThemeStore } from '../../hooks/useThemeStore';
import { ThemeToggle } from './ThemeToggle';

const mockToggleTheme = vi.fn();
const mockSetTheme = vi.fn();

vi.mock('../../hooks/useThemeStore', () => ({
  useThemeStore: vi.fn(),
}));

const renderComponent = (theme: 'light' | 'dark' = 'light') => {
  vi.mocked(useThemeStore).mockReturnValue({
    theme,
    toggleTheme: mockToggleTheme,
    setTheme: mockSetTheme,
  });
  return render(<ThemeToggle />);
};

describe('ThemeToggle', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    vi.clearAllMocks();
    user = userEvent.setup();
  });

  it('displays a button to switch to dark mode when current theme is light', () => {
    renderComponent('light');

    expect(
      screen.getByRole('button', { name: /switch to dark mode/i }),
    ).toBeInTheDocument();
  });

  it('displays a button to switch to light mode when current theme is dark', () => {
    renderComponent('dark');

    expect(
      screen.getByRole('button', { name: /switch to light mode/i }),
    ).toBeInTheDocument();
  });

  it('invokes the toggleTheme function when the button is clicked', async () => {
    renderComponent('light');

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('sets an accessible aria-label indicating the action that will be performed', () => {
    renderComponent('light');

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });
});
