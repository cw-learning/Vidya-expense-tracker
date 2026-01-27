import { render, screen } from '@testing-library/react';
// import { vi } from 'vitest'; -> Yet to add
import { Header } from './Header';

// vi.mock('../../../theme/components/ThemeToggle', () => ({
//   ThemeToggle: () => <div>ThemeToggle</div>,
// })); -> Yet to add

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
