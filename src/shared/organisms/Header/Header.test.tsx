import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Header } from './Header';
import type { HeaderProps } from './Header.types';

vi.mock('../../../features/theme/components/ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <div>ThemeToggle</div>,
}));

const renderComponent = (props?: Partial<HeaderProps>) => {
  const defaultProps: HeaderProps = {
    title: 'Expense Tracker',
    subtitle: 'Track your expenses effortlessly',
    ...props,
  };

  return render(<Header {...defaultProps} />);
};

describe('Header', () => {
  it('displays the title, subtitle, and theme toggle component', () => {
    renderComponent();
    expect(screen.getByText('Expense Tracker')).toBeInTheDocument();
    expect(
      screen.getByText('Track your expenses effortlessly'),
    ).toBeInTheDocument();
    expect(screen.getByText('ThemeToggle')).toBeInTheDocument();
  });
});
