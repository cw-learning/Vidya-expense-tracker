import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TotalExpense } from '../TotalExpense.jsx';

describe('TotalExpense', () => {
    it('should render total amount', () => {
        render(<TotalExpense totalAmount={150} />);

        expect(screen.getByText('Total Expenses')).toBeInTheDocument();
        expect(screen.getByText('₹150.00')).toBeInTheDocument();
    });

    it('should format amount with two decimal places', () => {
        render(<TotalExpense totalAmount={123.456} />);

        expect(screen.getByText('₹123.46')).toBeInTheDocument();
    });

    it('should display zero when total is zero', () => {
        render(<TotalExpense totalAmount={0} />);

        expect(screen.getByText('₹0.00')).toBeInTheDocument();
    });
});