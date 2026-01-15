import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button.jsx';

describe('Button', () => {
	it('should render button with children', () => {
		render(<Button>Click me</Button>);
		expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
	});

	it('should call onClick when clicked', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={handleClick}>Click me</Button>);

		await user.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should have correct type attribute', () => {
		render(<Button type="submit">Submit</Button>);
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});

	it('should default to type button', () => {
		render(<Button>Default</Button>);
		expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
	});

	it('should be disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('should not call onClick when disabled', async () => {
		const handleClick = vi.fn();
		const user = userEvent.setup();

		render(<Button onClick={handleClick} disabled>Disabled</Button>);

		await user.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('should apply primary variant styles by default', () => {
		render(<Button>Primary</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-blue-600');
	});

	it('should apply secondary variant styles', () => {
		render(<Button variant="secondary">Secondary</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-gray-600');
	});

	it('should apply danger variant styles', () => {
		render(<Button variant="danger">Delete</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-red-600');
	});

	it('should apply custom className', () => {
		render(<Button className="custom-class">Custom</Button>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('custom-class');
	});
});