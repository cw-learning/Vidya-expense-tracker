import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
/*
import { useThemeStore } from "../store/useThemeStore.js";
import { THEME_MODES } from "../utils/theme.constants.js";
*/

describe.skip("ThemeToggle", () => {
	beforeEach(() => {
		const { setTheme } = useThemeStore.getState();
		setTheme(THEME_MODES.LIGHT);
	});

	it("should render toggle button", () => {
		render(<ThemeToggle />);

	});

	it("should show dark mode button when theme is light", () => {
		render(<ThemeToggle />);

		expect(screen.getByText("Dark Mode")).toBeInTheDocument();
		expect(screen.getByText("🌙")).toBeInTheDocument();
	});

	it("should show light mode button when theme is dark", () => {
		const { setTheme } = useThemeStore.getState();
		setTheme(THEME_MODES.DARK);

		render(<ThemeToggle />);

		expect(screen.getByText("Light Mode")).toBeInTheDocument();
		expect(screen.getByText("☀️")).toBeInTheDocument();
	});

	it("should toggle theme when button is clicked", async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);

		const button = screen.getByRole("button");
		await user.click(button);

		const { theme } = useThemeStore.getState();
		expect(theme).toBe(THEME_MODES.DARK);
	});

	it("should have correct aria-label for light mode", () => {
		render(<ThemeToggle />);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label", "Switch to dark mode");
	});

	it("should have correct aria-label for dark mode", () => {
		const { setTheme } = useThemeStore.getState();
		setTheme(THEME_MODES.DARK);

		render(<ThemeToggle />);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label", "Switch to light mode");
	});

	it("should toggle multiple times", async () => {
		const user = userEvent.setup();
		render(<ThemeToggle />);

		const button = screen.getByRole("button");

		await user.click(button);
		let { theme } = useThemeStore.getState();
		expect(theme).toBe(THEME_MODES.DARK);

		await user.click(button);
		({ theme } = useThemeStore.getState());
		expect(theme).toBe(THEME_MODES.LIGHT);

		await user.click(button);
		({ theme } = useThemeStore.getState());
		expect(theme).toBe(THEME_MODES.DARK);
	});
});
