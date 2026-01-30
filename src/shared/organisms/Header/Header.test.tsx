import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Header } from './Header';

vi.mock('../../../core/hooks/useThemeColors', () => ({
  useThemeColors: () => ({
    text: 'text-gray-900',
    bg: 'bg-white',
    border: 'border-gray-200',
    accentText: 'text-teal-600',
  }),
}));

describe('Header', () => {
  it('renders title and subtitle', () => {
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
  });
});
