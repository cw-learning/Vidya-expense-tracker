import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Header } from './Header';

vi.mock('../../../features/theme/components/ThemeToggle/ThemeToggle', () => ({
  ThemeToggle: () => <div>ThemeToggle</div>,
}));

describe('Header', () => {
  it('renders title, subtitle, and ThemeToggle', () => {
    render(
      <Header
        title="Expense Tracker"
        subtitle="Track your expenses effortlessly"
      />,
    );
    expect(screen.getByText('Expense Tracker')).toBeInTheDocument();
    expect(
      screen.getByText('Track your expenses effortlessly'),
    ).toBeInTheDocument();
    expect(screen.getByText('ThemeToggle')).toBeInTheDocument();
  });
});
