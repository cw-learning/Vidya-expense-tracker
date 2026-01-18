import { describe, expect, it } from "vitest";
import { EXPENSE_CATEGORIES } from "../../models/expense.model.js";
import {
	validateExpense,
	validateExpenseAmount,
	validateExpenseCategory,
	validateExpenseTitle,
} from "../validateExpense.js";

describe("validateExpenseTitle", () => {
	it("should return null for valid title", () => {
		expect(validateExpenseTitle("Lunch")).toBeNull();
		expect(validateExpenseTitle("Coffee at Starbucks")).toBeNull();
	});

	it("should return error for empty title", () => {
		expect(validateExpenseTitle("")).toBe("title cannot be empty");
		expect(validateExpenseTitle("   ")).toBe("title cannot be empty");
	});

	it("should return error for null or undefined title", () => {
		expect(validateExpenseTitle(null)).toBe("title is required");
		expect(validateExpenseTitle(undefined)).toBe("title is required");
	});

	it("should return error for non-string title", () => {
		expect(validateExpenseTitle(123)).toBe("title is required");
		expect(validateExpenseTitle({})).toBe("title is required");
	});

	it("should return error for title longer than 100 characters", () => {
		const longTitle = "a".repeat(101);
		expect(validateExpenseTitle(longTitle)).toBe(
			"title must be less than 100 characters"
		);
	});
});

describe("validateExpenseAmount", () => {
	it("should return null for valid amount", () => {
		expect(validateExpenseAmount(100)).toBeNull();
		expect(validateExpenseAmount("100")).toBeNull();
		expect(validateExpenseAmount(0.01)).toBeNull();
	});

	it("should return error for empty amount", () => {
		expect(validateExpenseAmount("")).toBe("amount is required");
		expect(validateExpenseAmount(null)).toBe("amount is required");
		expect(validateExpenseAmount(undefined)).toBe("amount is required");
	});

	it("should return error for invalid number", () => {
		expect(validateExpenseAmount("abc")).toBe("amount must be a valid number");
		expect(validateExpenseAmount("12.34.56")).toBe(
			"amount must be a valid number"
		);
	});

	it("should return error for zero or negative amount", () => {
		expect(validateExpenseAmount(0)).toBe("amount must be greater than zero");
		expect(validateExpenseAmount(-10)).toBe("amount must be greater than zero");
	});

	it("should return error for amount exceeding maximum", () => {
		expect(validateExpenseAmount(1000001)).toBe(
			"amount must be less than 1,000,000"
		);
	});
});

describe("validateExpenseCategory", () => {
	it("should return null for valid category", () => {
		expect(validateExpenseCategory(EXPENSE_CATEGORIES.FOOD)).toBeNull();
		expect(validateExpenseCategory(EXPENSE_CATEGORIES.TRANSPORT)).toBeNull();
	});

	it("should return error for empty category", () => {
		expect(validateExpenseCategory("")).toBe("category is required");
		expect(validateExpenseCategory(null)).toBe("category is required");
		expect(validateExpenseCategory(undefined)).toBe("category is required");
	});

	it("should return error for invalid category", () => {
		expect(validateExpenseCategory("invalid")).toBe(
			"invalid category selected"
		);
		expect(validateExpenseCategory("random")).toBe("invalid category selected");
	});
});

describe("validateExpense", () => {
	it("should return empty object for valid expense", () => {
		const validExpense = {
			title: "Lunch",
			amount: 50,
			category: EXPENSE_CATEGORIES.FOOD,
		};
		expect(validateExpense(validExpense)).toEqual({});
	});

	it("should return all errors for invalid expense", () => {
		const invalidExpense = {
			title: "",
			amount: -10,
			category: "invalid",
		};
		const errors = validateExpense(invalidExpense);
		expect(errors.title).toBe("title cannot be empty");
		expect(errors.amount).toBe("amount must be greater than zero");
		expect(errors.category).toBe("invalid category selected");
	});

	it("should return specific errors for partially invalid expense", () => {
		const partiallyInvalid = {
			title: "Valid Title",
			amount: 0,
			category: EXPENSE_CATEGORIES.FOOD,
		};
		const errors = validateExpense(partiallyInvalid);
		expect(errors.title).toBeUndefined();
		expect(errors.amount).toBe("amount must be greater than zero");
		expect(errors.category).toBeUndefined();
	});
});
