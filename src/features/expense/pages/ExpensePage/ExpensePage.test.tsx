import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import * as currencyApi from '../../services/currencyApi/currencyApi';
import { ExpensePage } from './ExpensePage';

vi.mock('../../services/currencyApi/currencyApi');

describe('ExpensePage', () => {
  beforeEach(() => {
    vi.mocked(currencyApi.fetchExchangeRates).mockResolvedValue({
      USD: 0.012,
      EUR: 0.011,
      GBP: 0.0095,
      JPY: 1.8,
    });
  });

  it('renders the page with header and empty state', () => {
    render(<ExpensePage />);
    expect(screen.getByText(/expense tracker/i)).toBeInTheDocument();
    expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
  });

  it('adds and displays an expense', async () => {
    const user = userEvent.setup();
    render(<ExpensePage />);

    await user.click(screen.getByRole('button', { name: /\+ add expense/i }));

    await user.type(screen.getByLabelText(/title/i), 'Coffee');
    await user.type(screen.getByLabelText(/amount/i), '100');
    await user.selectOptions(screen.getByLabelText(/category/i), 'food');
    await user.selectOptions(screen.getByLabelText(/type/i), 'expense');

    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Add Expense',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/coffee/i)).toBeInTheDocument();
    });
  });

  it('deletes an expense and updates totals', async () => {
    const user = userEvent.setup();
    render(<ExpensePage />);

    await user.click(screen.getByRole('button', { name: /\+ add expense/i }));
    await user.type(screen.getByLabelText(/title/i), 'Lunch');
    await user.type(screen.getByLabelText(/amount/i), '200');
    await user.selectOptions(screen.getByLabelText(/category/i), 'food');
    await user.selectOptions(screen.getByLabelText(/type/i), 'expense');
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Add Expense',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/lunch/i)).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/lunch/i)).not.toBeInTheDocument();
      expect(screen.getByText(/no expenses yet/i)).toBeInTheDocument();
    });
  });

  it('updates summary cards when expenses are added', async () => {
    const user = userEvent.setup();
    render(<ExpensePage />);

    await user.click(screen.getByRole('button', { name: /\+ add expense/i }));
    await user.type(screen.getByLabelText(/title/i), 'Salary');
    await user.type(screen.getByLabelText(/amount/i), '5000');
    await user.selectOptions(screen.getByLabelText(/category/i), 'other');
    await user.selectOptions(screen.getByLabelText(/type/i), 'income');
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Add Expense',
      }),
    );

    await waitFor(() => {
      const totalCard = screen.getByText('Total Expenses').closest('.border-2');
      expect(totalCard).toBeInTheDocument();
      if (totalCard) {
        expect(
          within(totalCard as HTMLElement).getByText(/₹5000\.00/),
        ).toBeInTheDocument();
      }
    });
  });

  it('validates form and shows errors for invalid input', async () => {
    const user = userEvent.setup();
    render(<ExpensePage />);

    await user.click(screen.getByRole('button', { name: /\+ add expense/i }));
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Add Expense',
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/title cannot be empty/i)).toBeInTheDocument();
    });
  });
});
